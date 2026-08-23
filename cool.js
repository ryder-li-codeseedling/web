"use strict";

/*
=========================================================
 NEXUS // OMEGA CONTROL SYSTEM
 Short Command Edition
=========================================================
*/

const SYS = {
    bootTime: Date.now(),

    power: 82,
    cpu: 43,
    gpu: 67,
    memory: 61,
    network: 842,
    security: 98,

    theme: "cyan",

    scan: false,
    terminal: false,
    glitch: false,
    fullscreen: false,

    history: [],
    historyIndex: -1
};


/* =====================================================
   HELPERS
===================================================== */

const $ = selector =>
    document.querySelector(selector);

const rnd = (min, max) =>
    Math.random() * (max - min) + min;

const rndInt = (min, max) =>
    Math.floor(rnd(min, max + 1));

const clamp = (n, min, max) =>
    Math.max(min, Math.min(max, n));


/* =====================================================
   INTERFACE
===================================================== */

function createInterface() {

    /* CONTROL */

    const control =
        document.createElement("div");

    control.id = "omegaControl";

    control.innerHTML = `
        <div class="omega-title">
            OMEGA CONTROL
        </div>

        <button id="omegaTerminal">
            TERMINAL
        </button>

        <button id="omegaScan">
            SCAN
        </button>

        <button id="omegaTheme">
            THEME
        </button>

        <button id="omegaGlitch">
            GLITCH
        </button>

        <button id="omegaFullscreen">
            FULL
        </button>
    `;

    document.body.appendChild(control);


    /* TERMINAL */

    const terminal =
        document.createElement("div");

    terminal.id =
        "omegaTerminalWindow";

    terminal.innerHTML = `
        <div class="terminal-header">

            <span>
                NEXUS // OMEGA TERMINAL
            </span>

            <button id="closeTerminal">
                ×
            </button>

        </div>

        <div
            id="terminalOutput"
            class="terminal-output"
        >
            <div>NEXUS TERMINAL v9.7.3</div>
            <div>Secure connection established.</div>
            <div>OMEGA privilege detected.</div>
            <div>Type <b>help</b> for commands.</div>
        </div>

        <div class="terminal-input-row">

            <span>
                root@nexus:~$
            </span>

            <input
                id="terminalInput"
                autocomplete="off"
                spellcheck="false"
            >

        </div>
    `;

    document.body.appendChild(terminal);


    /* NETWORK */

    const nodes =
        document.createElement("div");

    nodes.id =
        "omegaNodes";

    nodes.innerHTML = `
        <div class="node-title">
            NETWORK TOPOLOGY
        </div>

        <canvas id="networkCanvas"></canvas>

        <div class="node-status">
            ● LIVE NODE LINK
        </div>
    `;

    document.body.appendChild(nodes);


    /* HUD */

    const hud =
        document.createElement("div");

    hud.id =
        "omegaHUD";

    hud.innerHTML = `
        <div>
            SIGNAL
            <span id="signalValue">98%</span>
        </div>

        <div>
            LATENCY
            <span id="latencyValue">12ms</span>
        </div>

        <div>
            STABILITY
            <span id="stabilityValue">99.7%</span>
        </div>
    `;

    document.body.appendChild(hud);

    addStyles();
}


/* =====================================================
   EXTRA CSS
===================================================== */

function addStyles() {

    const style =
        document.createElement("style");

    style.textContent = `

        :root {
            --omega-primary: #00f0ff;
            --omega-secondary: #00ff9d;
        }

        #omegaControl {

            position: fixed;

            right: 20px;
            bottom: 20px;

            width: 180px;

            padding: 15px;

            background:
                rgba(3,12,18,.94);

            border:
                1px solid
                rgba(0,240,255,.35);

            box-shadow:
                0 0 30px
                rgba(0,240,255,.08);

            backdrop-filter:
                blur(15px);

            z-index: 9999;

            font-family:
                monospace;
        }

        .omega-title {

            color:
                var(--omega-primary);

            font-size: 11px;

            letter-spacing: 3px;

            margin-bottom: 10px;
        }

        #omegaControl button {

            width: 100%;

            margin-top: 6px;

            padding: 8px;

            background:
                rgba(0,240,255,.03);

            border:
                1px solid
                rgba(0,240,255,.2);

            color:
                var(--omega-primary);

            cursor: pointer;

            font-size: 10px;

            letter-spacing: 1px;

            transition: .2s;
        }

        #omegaControl button:hover {

            background:
                rgba(0,240,255,.12);

            border-color:
                var(--omega-primary);

            box-shadow:
                0 0 15px
                rgba(0,240,255,.25);

            color: white;
        }


        /* TERMINAL */

        #omegaTerminalWindow {

            position: fixed;

            left: 50%;
            top: 50%;

            transform:
                translate(-50%,-50%)
                scale(.9);

            width:
                min(760px,90vw);

            height: 450px;

            background:
                rgba(2,7,12,.97);

            border:
                1px solid
                var(--omega-primary);

            box-shadow:
                0 0 60px
                rgba(0,240,255,.25);

            z-index: 10000;

            opacity: 0;

            pointer-events: none;

            transition: .25s;

            font-family:
                monospace;
        }

        #omegaTerminalWindow.open {

            opacity: 1;

            pointer-events: auto;

            transform:
                translate(-50%,-50%)
                scale(1);
        }

        .terminal-header {

            height: 40px;

            display: flex;

            justify-content:
                space-between;

            align-items: center;

            padding: 0 15px;

            border-bottom:
                1px solid
                rgba(0,240,255,.2);

            color:
                var(--omega-primary);

            font-size: 12px;

            letter-spacing: 2px;
        }

        #closeTerminal {

            background: none;

            border: none;

            color: #ff4466;

            font-size: 22px;

            cursor: pointer;
        }

        .terminal-output {

            height: 355px;

            padding: 15px;

            overflow-y: auto;

            color: #7fffd4;

            font-size: 12px;

            line-height: 1.8;

            scrollbar-width: thin;
        }

        .terminal-input-row {

            display: flex;

            padding:
                10px 15px;

            border-top:
                1px solid
                rgba(0,240,255,.15);

            color:
                var(--omega-primary);

            gap: 8px;
        }

        #terminalInput {

            flex: 1;

            background: none;

            border: none;

            outline: none;

            color: white;

            font-family:
                monospace;

            font-size: 12px;
        }


        /* NETWORK */

        #omegaNodes {

            position: fixed;

            left: 20px;

            bottom: 20px;

            width: 320px;

            height: 220px;

            background:
                rgba(3,12,18,.88);

            border:
                1px solid
                rgba(0,240,255,.25);

            z-index: 9998;

            backdrop-filter:
                blur(10px);
        }

        .node-title {

            padding: 10px;

            color:
                var(--omega-primary);

            font-size: 10px;

            letter-spacing: 2px;
        }

        #networkCanvas {

            width: 100%;

            height: 170px;

            display: block;
        }

        .node-status {

            position: absolute;

            bottom: 5px;

            right: 8px;

            font-size: 8px;

            color:
                var(--omega-secondary);

            letter-spacing: 1px;
        }


        /* HUD */

        #omegaHUD {

            position: fixed;

            top: 15px;

            right: 20px;

            display: flex;

            gap: 15px;

            z-index: 9997;

            font-family:
                monospace;

            font-size: 9px;

            color: #50747d;
        }

        #omegaHUD div {

            padding:
                7px 10px;

            border:
                1px solid
                rgba(0,240,255,.12);

            background:
                rgba(0,10,15,.6);
        }

        #omegaHUD span {

            color:
                var(--omega-primary);

            margin-left: 5px;
        }


        /* GLITCH */

        body.omega-glitch {

            animation:
                omegaGlitch .15s infinite;
        }

        @keyframes omegaGlitch {

            0% {
                transform: translate(0);
            }

            25% {
                transform:
                    translate(-2px,1px);
            }

            50% {
                transform:
                    translate(2px,-1px);
            }

            75% {
                transform:
                    translate(-1px,2px);
            }

            100% {
                transform: translate(0);
            }
        }

        body.omega-glitch::after {

            content: "";

            position: fixed;

            inset: 0;

            pointer-events: none;

            z-index: 99999;

            background:
                repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 3px,
                    rgba(0,240,255,.035) 4px
                );
        }


        @media(max-width:700px) {

            #omegaNodes {

                width: 220px;
                height: 170px;

                left: 10px;
                bottom: 10px;
            }

            #omegaControl {

                width: 150px;

                right: 10px;
                bottom: 10px;
            }

            #omegaHUD {
                display: none;
            }

            #networkCanvas {
                height: 125px;
            }
        }
    `;

    document.head.appendChild(style);
}


/* =====================================================
   TERMINAL
===================================================== */

function openTerminal() {

    const terminal =
        $("#omegaTerminalWindow");

    if (!terminal) return;

    terminal.classList.add("open");

    SYS.terminal = true;

    setTimeout(() => {

        $("#terminalInput")?.focus();

    }, 100);
}


function closeTerminal() {

    const terminal =
        $("#omegaTerminalWindow");

    if (!terminal) return;

    terminal.classList.remove("open");

    SYS.terminal = false;
}


function print(text, color = null) {

    const output =
        $("#terminalOutput");

    if (!output) return;

    const line =
        document.createElement("div");

    line.textContent = text;

    if (color) {
        line.style.color = color;
    }

    output.appendChild(line);

    output.scrollTop =
        output.scrollHeight;
}


/* =====================================================
   COMMAND ENGINE
===================================================== */

function executeCommand(input) {

    const raw =
        input.trim();

    if (!raw) return;


    const parts =
        raw.split(/\s+/);

    const cmd =
        parts[0].toLowerCase();

    const args =
        parts.slice(1);


    SYS.history.push(raw);

    SYS.historyIndex =
        SYS.history.length;


    print(
        `root@nexus:~$ ${raw}`,
        "#ffffff"
    );


    /* =================================================
       HELP
    ================================================= */

    if (cmd === "help") {

        print(
            "━━━━━━━━ COMMANDS ━━━━━━━━",
            "#00f0ff"
        );

        print("SYSTEM");

        print("status");
        print("info");
        print("uptime");
        print("version");
        print("whoami");
        print("host");

        print("DIAGNOSTICS");

        print("scan");
        print("secure");
        print("diag");
        print("cpu");
        print("gpu");
        print("memory");
        print("thermal");

        print("NETWORK");

        print("network");
        print("nodes");
        print("ping <node>");
        print("trace <node>");
        print("speed");

        print("PROCESS");

        print("proc");
        print("svc");
        print("logs");

        print("CRYPTO");

        print("ent");
        print("crypto");

        print("SIMULATION");

        print("hack");
        print("dec");
        print("over");
        print("launch");

        print("CONTROL");

        print("coffee");
        print("sudo");
        print("theme");
        print("glitch");
        print("matrix");
        print("full");
        print("clear");
        print("reboot");

        print(
            "━━━━━━━━━━━━━━━━━━━━━━━━",
            "#00f0ff"
        );

        return;
    }


    /* =================================================
       SYSTEM
    ================================================= */

    if (cmd === "status") {

        print(
            "┌──── SYSTEM STATUS ────┐",
            "#00f0ff"
        );

        print(
            `CPU       ${SYS.cpu.toFixed(1)}%`
        );

        print(
            `GPU       ${SYS.gpu.toFixed(1)}%`
        );

        print(
            `MEMORY    ${SYS.memory.toFixed(1)}%`
        );

        print(
            `NETWORK   ${Math.round(SYS.network)} Mbps`
        );

        print(
            `SECURITY  ${SYS.security}%`
        );

        print(
            "CORE      ONLINE",
            "#00ff9d"
        );

        print(
            "QUANTUM   STABLE",
            "#00ff9d"
        );

        print(
            "└──────────────────────┘",
            "#00f0ff"
        );

        return;
    }


    if (cmd === "info") {

        print(
            "NEXUS OMEGA CONTROL SYSTEM",
            "#00f0ff"
        );

        print("Architecture : NX-OMEGA");
        print("Kernel       : NEXUS-K9");
        print("Protocol     : QUANTUM-LINK");
        print("Encryption   : AES-4096");
        print("Core         : NEURAL-X");

        print(
            "Status       : OPERATIONAL",
            "#00ff9d"
        );

        return;
    }


    if (cmd === "uptime") {

        const seconds =
            Math.floor(
                (Date.now() - SYS.bootTime) /
                1000
            );

        const h =
            Math.floor(seconds / 3600);

        const m =
            Math.floor(
                (seconds % 3600) / 60
            );

        const s =
            seconds % 60;

        print(
            `UPTIME: ${h}h ${m}m ${s}s`,
            "#00ff9d"
        );

        return;
    }


    if (cmd === "version") {

        print(
            "NEXUS OMEGA v9.7.3",
            "#00f0ff"
        );

        print("Build: 7731-OMEGA");
        print("Kernel: 12.8.4-NX");

        return;
    }


    if (cmd === "whoami") {

        print(
            "root",
            "#00ff9d"
        );

        print("Privilege: OMEGA");
        print("Access: UNRESTRICTED");

        return;
    }


    if (cmd === "host") {

        print(
            "NX-OMEGA-7731",
            "#00f0ff"
        );

        return;
    }


    /* =================================================
       DIAGNOSTICS
    ================================================= */

    if (cmd === "scan") {

        startScan();

        return;
    }


    if (cmd === "secure") {

        print(
            "SECURITY MATRIX",
            "#00f0ff"
        );

        print(
            "Firewall     ACTIVE",
            "#00ff9d"
        );

        print(
            "Intrusion    ACTIVE",
            "#00ff9d"
        );

        print(
            "Encryption   ACTIVE",
            "#00ff9d"
        );

        print(
            `Score        ${SYS.security}/100`,
            "#00ff9d"
        );

        return;
    }


    if (cmd === "diag") {

        const tests = [
            "CPU",
            "GPU",
            "MEMORY",
            "NETWORK",
            "SECURITY",
            "THERMAL",
            "STORAGE",
            "QUANTUM"
        ];

        print(
            "RUNNING DIAGNOSTICS...",
            "#00f0ff"
        );

        tests.forEach(
            (test, i) => {

                setTimeout(() => {

                    print(
                        `[ OK ] ${test}`,
                        "#00ff9d"
                    );

                }, i * 300);
            }
        );

        setTimeout(() => {

            print(
                "DIAGNOSTICS COMPLETE",
                "#00ff9d"
            );

        }, tests.length * 300 + 300);

        return;
    }


    if (cmd === "cpu") {

        print(
            "CPU DIAGNOSTIC",
            "#00f0ff"
        );

        print(
            `Load: ${SYS.cpu.toFixed(2)}%`
        );

        print("Cores: 64");
        print("Frequency: 7.8 GHz");
        print("Temperature: 742 K");

        print(
            "Status: NOMINAL",
            "#00ff9d"
        );

        return;
    }


    if (cmd === "gpu") {

        print(
            "GPU DIAGNOSTIC",
            "#00f0ff"
        );

        print(
            `Load: ${SYS.gpu.toFixed(2)}%`
        );

        print("VRAM: 64 GB");
        print("Ray Engine: ACTIVE");

        print(
            "Status: NOMINAL",
            "#00ff9d"
        );

        return;
    }


    if (cmd === "memory") {

        print(
            "MEMORY MATRIX",
            "#00f0ff"
        );

        print(
            `Usage: ${SYS.memory.toFixed(1)}%`
        );

        print("Installed: 512 GB");

        print(
            `Allocated: ${(512 * SYS.memory / 100).toFixed(1)} GB`
        );

        print(
            "ECC: ENABLED",
            "#00ff9d"
        );

        return;
    }


    if (cmd === "thermal") {

        print(
            "THERMAL MATRIX",
            "#00f0ff"
        );

        print(
            `Core: ${rndInt(680,790)} K`
        );

        print(
            `Cooling: ${rndInt(92,99)}%`
        );

        print(
            "Coolant: NOMINAL",
            "#00ff9d"
        );

        return;
    }


    /* =================================================
       NETWORK
    ================================================= */

    if (cmd === "network") {

        print(
            "NETWORK MATRIX",
            "#00f0ff"
        );

        print(
            `Bandwidth: ${Math.round(SYS.network)} Mbps`
        );

        print("Latency: 12 ms");
        print("Packet loss: 0.002%");

        print(
            "Link: STABLE",
            "#00ff9d"
        );

        return;
    }


    if (cmd === "nodes") {

        const nodes = [
            "NX-01",
            "NX-07",
            "NX-13",
            "NX-21",
            "NX-31",
            "NX-44",
            "NX-58",
            "NX-77",
            "NX-88"
        ];

        print(
            "CONNECTED NODES",
            "#00f0ff"
        );

        nodes.forEach(node => {

            print(
                `${node} [ONLINE]`,
                "#00ff9d"
            );

        });

        return;
    }


    if (cmd === "ping") {

        const node =
            args[0] || "NX-01";

        print(
            `PING ${node}...`,
            "#00f0ff"
        );

        let count = 0;

        const timer =
            setInterval(() => {

                count++;

                print(
                    `64 bytes from ${node}: ${rndInt(4,22)}ms`
                );

                if (count >= 4) {

                    clearInterval(timer);

                    print(
                        "CONNECTION STABLE",
                        "#00ff9d"
                    );
                }

            }, 400);

        return;
    }


    if (cmd === "trace") {

        const node =
            args[0] || "NX-77";

        const hops = [
            "NX-GATE",
            "NX-ROUTER",
            "NX-BACKBONE",
            "NX-CORE",
            node
        ];

        print(
            `TRACE ${node}`,
            "#00f0ff"
        );

        hops.forEach(
            (hop, i) => {

                setTimeout(() => {

                    print(
                        `${i + 1}  ${hop}  ${rndInt(3,30)}ms`
                    );

                }, i * 400);
            }
        );

        return;
    }


    if (cmd === "speed") {

        print(
            "BANDWIDTH TEST",
            "#00f0ff"
        );

        print(
            `DOWN  ${rndInt(700,1300)} Mbps`
        );

        print(
            `UP    ${rndInt(400,900)} Mbps`
        );

        print(
            `PING  ${rndInt(7,18)} ms`
        );

        print(
            "QUALITY: EXCELLENT",
            "#00ff9d"
        );

        return;
    }


    /* =================================================
       PROCESS
    ================================================= */

    if (cmd === "proc") {

        const list = [
            "nexus_core",
            "neural_matrix",
            "quantum_link",
            "telemetry",
            "security",
            "network_mesh",
            "thermal",
            "visual",
            "omega_ai"
        ];

        print(
            "PROCESS TABLE",
            "#00f0ff"
        );

        list.forEach(name => {

            print(
                `${name.padEnd(20)} PID ${rndInt(1000,9999)}`
            );

        });

        return;
    }


    if (cmd === "svc") {

        const services = [
            "CORE",
            "NETWORK",
            "SECURITY",
            "TELEMETRY",
            "QUANTUM",
            "NEURAL",
            "VISUAL"
        ];

        print(
            "SERVICE TABLE",
            "#00f0ff"
        );

        services.forEach(service => {

            print(
                `${service.padEnd(15)} RUNNING`,
                "#00ff9d"
            );

        });

        return;
    }


    if (cmd === "logs") {

        const logs = [
            "Core synchronized",
            "Network updated",
            "Security verified",
            "Telemetry received",
            "Memory optimized",
            "Thermal recalibrated",
            "Quantum synchronized",
            "Neural routing optimized"
        ];

        print(
            "SYSTEM LOG",
            "#00f0ff"
        );

        logs.forEach(log => {

            print(
                `[${new Date().toLocaleTimeString()}] ${log}`
            );

        });

        return;
    }


    /* =================================================
       CRYPTO
    ================================================= */

    if (cmd === "ent") {

        print(
            "CALCULATING ENTROPY..."
        );

        setTimeout(() => {

            print(
                `ENTROPY: ${rnd(.001,.999).toFixed(6)}`,
                "#00ff9d"
            );

            print(
                `CHAOS: ${rndInt(1,18)}%`
            );

        }, 800);

        return;
    }


    if (cmd === "crypto") {

        print(
            "CRYPTO ENGINE",
            "#00f0ff"
        );

        print(
            "AES-4096     ACTIVE",
            "#00ff9d"
        );

        print(
            "QUANTUM-X    ACTIVE",
            "#00ff9d"
        );

        print(
            "ROTATION     AUTO",
            "#00ff9d"
        );

        return;
    }


    /* =================================================
       SIMULATION
    ================================================= */

    if (cmd === "hack") {

        print(
            "ACCESS SIMULATION",
            "#ff4466"
        );

        print(
            "LOCAL SIMULATION ONLY."
        );

        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        let count = 0;

        const timer =
            setInterval(() => {

                let line = "";

                for (
                    let i = 0;
                    i < 38;
                    i++
                ) {

                    line +=
                        chars[
                            rndInt(
                                0,
                                chars.length - 1
                            )
                        ];
                }

                print(
                    line,
                    "#ff4466"
                );

                count++;

                if (count >= 15) {

                    clearInterval(timer);

                    print(
                        "ACCESS DENIED",
                        "#00ff9d"
                    );
                }

            }, 120);

        return;
    }


    if (cmd === "dec") {

        print(
            "DECRYPTING...",
            "#ffff00"
        );

        let progress = 0;

        const timer =
            setInterval(() => {

                progress +=
                    rndInt(6,14);

                progress =
                    Math.min(
                        progress,
                        100
                    );

                print(
                    `PROGRESS ${progress}%`
                );

                if (progress >= 100) {

                    clearInterval(timer);

                    print(
                        "PLAINTEXT RECOVERED",
                        "#00ff9d"
                    );

                    print(
                        "ORIGIN: UNKNOWN",
                        "#ff4466"
                    );
                }

            }, 250);

        return;
    }


    if (cmd === "over") {

        print(
            "REQUESTING OMEGA ACCESS...",
            "#ffff00"
        );

        setTimeout(() => {

            print(
                "ACCESS LEVEL: OMEGA",
                "#00ff9d"
            );

            print(
                "OVERRIDE READY",
                "#00ff9d"
            );

        }, 900);

        return;
    }


    if (cmd === "launch") {

        print(
            "SEARCHING PROTOCOLS..."
        );

        setTimeout(() => {

            print(
                "ORBITAL PROTOCOL",
                "#00f0ff"
            );

            print(
                "STATUS: LOCKED"
            );

            print(
                "CLEARANCE REQUIRED",
                "#ff4466"
            );

        }, 1000);

        return;
    }


    /* =================================================
       MISC
    ================================================= */

    if (cmd === "coffee") {

        print(
            "☕ COFFEE PROTOCOL"
        );

        setTimeout(() => {

            print(
                "CAFFEINE: OPTIMAL",
                "#00ff9d"
            );

            print(
                "PRODUCTIVITY: +73%"
            );

        }, 600);

        return;
    }


    if (cmd === "sudo") {

        print(
            "root access already active.",
            "#00ff9d"
        );

        return;
    }


    if (cmd === "theme") {

        changeTheme();

        return;
    }


    if (cmd === "glitch") {

        toggleGlitch();

        print(
            SYS.glitch
                ? "GLITCH ON"
                : "GLITCH OFF",
            "#ff4466"
        );

        return;
    }


    if (cmd === "matrix") {

        print(
            "MATRIX STREAM",
            "#00ff9d"
        );

        matrix();

        return;
    }


    if (cmd === "full") {

        fullscreen();

        return;
    }


    if (cmd === "clear") {

        const output =
            $("#terminalOutput");

        if (output) {
            output.innerHTML = "";
        }

        return;
    }


    if (cmd === "reboot") {

        print(
            "REBOOTING NEXUS...",
            "#ff4466"
        );

        setTimeout(() => {

            print(
                "CLOSING PROCESSES..."
            );

        }, 400);

        setTimeout(() => {

            print(
                "SAVING STATE..."
            );

        }, 800);

        setTimeout(() => {

            location.reload();

        }, 1500);

        return;
    }


    /* =================================================
       UNKNOWN
    ================================================= */

    print(
        `UNKNOWN COMMAND: ${cmd}`,
        "#ff4466"
    );

    print(
        "TYPE help"
    );
}


/* =====================================================
   SCAN
===================================================== */

function startScan() {

    if (SYS.scan) return;

    SYS.scan = true;

    const list = [
        "MEMORY",
        "NETWORK",
        "SECURITY",
        "NEURAL",
        "THERMAL",
        "STORAGE",
        "QUANTUM",
        "CORE"
    ];

    print(
        "DEEP SCAN STARTED...",
        "#00f0ff"
    );

    list.forEach(
        (name, i) => {

            setTimeout(() => {

                print(
                    `[ OK ] ${name}`,
                    "#00ff9d"
                );

            }, i * 350);
        }
    );

    setTimeout(() => {

        SYS.scan = false;

        SYS.security =
            rndInt(97,100);

        print(
            "SCAN COMPLETE",
            "#00ff9d"
        );

        print(
            "ANOMALIES: 0"
        );

    }, list.length * 350 + 300);
}


/* =====================================================
   THEME
===================================================== */

const themes = [

    {
        name: "cyan",
        primary: "#00f0ff",
        secondary: "#00ff9d"
    },

    {
        name: "purple",
        primary: "#a855f7",
        secondary: "#ec4899"
    },

    {
        name: "red",
        primary: "#ff3344",
        secondary: "#ff9900"
    },

    {
        name: "green",
        primary: "#00ff88",
        secondary: "#ccff00"
    },

    {
        name: "white",
        primary: "#ffffff",
        secondary: "#8ca6b5"
    }
];


function changeTheme() {

    const current =
        themes.findIndex(
            t =>
                t.name === SYS.theme
        );

    const next =
        themes[
            (current + 1) %
            themes.length
        ];

    SYS.theme =
        next.name;

    document.documentElement
        .style
        .setProperty(
            "--omega-primary",
            next.primary
        );

    document.documentElement
        .style
        .setProperty(
            "--omega-secondary",
            next.secondary
        );

    print(
        `THEME: ${next.name.toUpperCase()}`,
        next.primary
    );
}


/* =====================================================
   GLITCH
===================================================== */

function toggleGlitch() {

    SYS.glitch =
        !SYS.glitch;

    document.body.classList.toggle(
        "omega-glitch",
        SYS.glitch
    );
}


/* =====================================================
   FULLSCREEN
===================================================== */

async function fullscreen() {

    try {

        if (!document.fullscreenElement) {

            await document.documentElement
                .requestFullscreen();

            SYS.fullscreen = true;

        } else {

            await document.exitFullscreen();

            SYS.fullscreen = false;
        }

    } catch (error) {

        console.log(
            "Fullscreen unavailable."
        );
    }
}


/* =====================================================
   MATRIX
===================================================== */

function matrix() {

    const canvas =
        document.createElement("canvas");

    canvas.style.position =
        "fixed";

    canvas.style.inset = "0";

    canvas.style.width = "100%";

    canvas.style.height = "100%";

    canvas.style.pointerEvents =
        "none";

    canvas.style.zIndex =
        "99998";

    document.body.appendChild(canvas);


    const ctx =
        canvas.getContext("2d");


    canvas.width =
        innerWidth;

    canvas.height =
        innerHeight;


    const chars =
        "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%";

    const size = 13;

    const columns =
        Math.floor(
            canvas.width / size
        );

    const drops =
        new Array(columns).fill(1);

    let active = true;


    function draw() {

        if (!active) return;

        ctx.fillStyle =
            "rgba(0,0,0,.08)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle =
            "#00ff88";

        ctx.font =
            `${size}px monospace`;


        for (
            let i = 0;
            i < drops.length;
            i++
        ) {

            const char =
                chars[
                    Math.floor(
                        Math.random() *
                        chars.length
                    )
                ];

            ctx.fillText(
                char,
                i * size,
                drops[i] * size
            );

            if (
                drops[i] * size >
                canvas.height &&
                Math.random() > .975
            ) {

                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    draw();


    setTimeout(() => {

        active = false;

        canvas.remove();

    }, 6000);
}


/* =====================================================
   NETWORK CANVAS
===================================================== */

function networkCanvas() {

    const canvas =
        $("#networkCanvas");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");


    function resize() {

        const ratio =
            devicePixelRatio || 1;

        canvas.width =
            canvas.clientWidth * ratio;

        canvas.height =
            canvas.clientHeight * ratio;

        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );
    }


    resize();

    window.addEventListener(
        "resize",
        resize
    );


    const nodes = [];


    for (let i = 0; i < 14; i++) {

        nodes.push({

            x: rnd(10,300),

            y: rnd(20,160),

            vx: rnd(-.35,.35),

            vy: rnd(-.35,.35),

            radius: rnd(2,4)
        });
    }


    function draw() {

        const width =
            canvas.clientWidth;

        const height =
            canvas.clientHeight;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        nodes.forEach(
            (a, i) => {

                nodes.forEach(
                    (b, j) => {

                        if (i >= j) return;

                        const dx =
                            a.x - b.x;

                        const dy =
                            a.y - b.y;

                        const distance =
                            Math.sqrt(
                                dx * dx +
                                dy * dy
                            );


                        if (
                            distance < 110
                        ) {

                            ctx.beginPath();

                            ctx.moveTo(
                                a.x,
                                a.y
                            );

                            ctx.lineTo(
                                b.x,
                                b.y
                            );

                            ctx.strokeStyle =
                                `rgba(
                                    0,
                                    240,
                                    255,
                                    ${
                                        1 -
                                        distance /
                                        110
                                    }
                                )`;

                            ctx.lineWidth = .5;

                            ctx.stroke();
                        }
                    }
                );
            }
        );


        nodes.forEach(node => {

            node.x += node.vx;

            node.y += node.vy;


            if (
                node.x < 5 ||
                node.x > width - 5
            ) {

                node.vx *= -1;
            }


            if (
                node.y < 20 ||
                node.y > height - 5
            ) {

                node.vy *= -1;
            }


            ctx.beginPath();

            ctx.arc(
                node.x,
                node.y,
                node.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#00f0ff";

            ctx.shadowBlur =
                10;

            ctx.shadowColor =
                "#00f0ff";

            ctx.fill();

            ctx.shadowBlur = 0;
        });


        requestAnimationFrame(draw);
    }


    draw();
}


/* =====================================================
   PARTICLES
===================================================== */

function particles() {

    const canvas =
        document.createElement("canvas");

    canvas.style.position =
        "fixed";

    canvas.style.inset = "0";

    canvas.style.width =
        "100%";

    canvas.style.height =
        "100%";

    canvas.style.pointerEvents =
        "none";

    canvas.style.zIndex =
        "-1";

    document.body.prepend(canvas);


    const ctx =
        canvas.getContext("2d");


    function resize() {

        canvas.width =
            innerWidth;

        canvas.height =
            innerHeight;
    }


    resize();

    window.addEventListener(
        "resize",
        resize
    );


    const list = [];


    for (let i = 0; i < 80; i++) {

        list.push({

            x: rnd(0,canvas.width),

            y: rnd(0,canvas.height),

            size: rnd(.5,2),

            speed: rnd(.05,.35),

            opacity: rnd(.1,.6)
        });
    }


    function draw() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        list.forEach(p => {

            p.y -= p.speed;


            if (p.y < 0) {

                p.y =
                    canvas.height;
            }


            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(
                    0,
                    240,
                    255,
                    ${p.opacity}
                )`;

            ctx.fill();
        });


        requestAnimationFrame(draw);
    }


    draw();
}


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        const input =
            $("#terminalInput");

        if (!input) return;


        if (
            document.activeElement === input
        ) {

            if (
                event.key === "Enter"
            ) {

                executeCommand(
                    input.value
                );

                input.value = "";

                return;
            }


            if (
                event.key === "ArrowUp"
            ) {

                if (
                    SYS.history.length
                ) {

                    SYS.historyIndex =
                        Math.max(
                            0,
                            SYS.historyIndex - 1
                        );

                    input.value =
                        SYS.history[
                            SYS.historyIndex
                        ] || "";
                }

                event.preventDefault();

                return;
            }


            if (
                event.key === "ArrowDown"
            ) {

                SYS.historyIndex =
                    Math.min(
                        SYS.history.length,
                        SYS.historyIndex + 1
                    );

                input.value =
                    SYS.history[
                        SYS.historyIndex
                    ] || "";

                event.preventDefault();

                return;
            }
        }


        /* CTRL + K */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openTerminal();
        }


        /* F2 */

        if (
            event.key === "F2"
        ) {

            event.preventDefault();

            fullscreen();
        }


        /* F8 */

        if (
            event.key === "F8"
        ) {

            event.preventDefault();

            toggleGlitch();
        }


        /* ESC */

        if (
            event.key === "Escape"
        ) {

            closeTerminal();

            SYS.glitch = false;

            document.body.classList.remove(
                "omega-glitch"
            );
        }
    }
);


/* =====================================================
   BUTTONS
===================================================== */

document.addEventListener(
    "click",
    event => {

        const id =
            event.target.id;


        if (
            id === "omegaTerminal"
        ) {

            openTerminal();
        }


        if (
            id === "closeTerminal"
        ) {

            closeTerminal();
        }


        if (
            id === "omegaScan"
        ) {

            openTerminal();

            setTimeout(() => {

                executeCommand("scan");

            }, 200);
        }


        if (
            id === "omegaTheme"
        ) {

            changeTheme();
        }


        if (
            id === "omegaGlitch"
        ) {

            toggleGlitch();
        }


        if (
            id === "omegaFullscreen"
        ) {

            fullscreen();
        }
    }
);


/* =====================================================
   LIVE SYSTEM DATA
===================================================== */

setInterval(() => {

    SYS.cpu += rnd(-4,4);

    SYS.gpu += rnd(-5,5);

    SYS.memory += rnd(-2,2);

    SYS.network += rnd(-50,50);


    SYS.cpu =
        clamp(
            SYS.cpu,
            10,
            95
        );

    SYS.gpu =
        clamp(
            SYS.gpu,
            10,
            99
        );

    SYS.memory =
        clamp(
            SYS.memory,
            20,
            90
        );

    SYS.network =
        clamp(
            SYS.network,
            300,
            1400
        );


    const signal =
        $("#signalValue");

    const latency =
        $("#latencyValue");

    const stability =
        $("#stabilityValue");


    if (signal) {

        signal.textContent =
            `${rndInt(94,100)}%`;
    }


    if (latency) {

        latency.textContent =
            `${rndInt(7,19)}ms`;
    }


    if (stability) {

        stability.textContent =
            `${rnd(99.1,99.9).toFixed(1)}%`;
    }

}, 1000);


/* =====================================================
   RANDOM EVENTS
===================================================== */

setInterval(() => {

    const events = [

        "CORE SYNCHRONIZED",

        "NEURAL ROUTING OPTIMIZED",

        "ENCRYPTION ROTATED",

        "NODE HANDSHAKE ACCEPTED",

        "THERMAL MATRIX UPDATED",

        "TELEMETRY RECEIVED",

        "CORE FREQUENCY STABILIZED",

        "REMOTE NODE AUTHENTICATED",

        "MEMORY OPTIMIZED"

    ];


    const event =
        events[
            rndInt(
                0,
                events.length - 1
            )
        ];


    if (
        Math.random() > .35
    ) {

        print(
            `[AUTO] ${event}`,
            "#50747d"
        );
    }

}, 8000);


/* =====================================================
   INIT
===================================================== */

window.addEventListener(
    "load",
    () => {

        createInterface();

        particles();

        networkCanvas();


        setTimeout(() => {

            print(
                "NEXUS OMEGA READY.",
                "#00ff9d"
            );

            print(
                "INTEGRITY: 100%",
                "#00ff9d"
            );

            print(
                "TYPE help"
            );

        }, 1000);


        console.log(
            "%c NEXUS OMEGA ONLINE ",
            `
                background:#00f0ff;
                color:#001014;
                padding:10px 18px;
                font-weight:bold;
                font-family:monospace;
            `
        );

        console.log(
            "%cCTRL + K → TERMINAL",
            "color:#00ff9d"
        );

        console.log(
            "%cF2 → FULLSCREEN",
            "color:#00ff9d"
        );

        console.log(
            "%cF8 → GLITCH",
            "color:#00ff9d"
        );
    }
);
