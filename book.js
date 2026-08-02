// =====================================
// The Refrigerator Chronicles
// Long Nonsense Book Generator
// =====================================


const container = document.getElementById("generated-pages");



const chapters = [

{
title:"Chapter One: The Paper Who Escaped The Refrigerator",

pages:[

`Gregory the paper woke up inside the refrigerator at exactly eleven spoons past morning. He stretched his four corners carefully because corners become nervous when exposed to unexpected weather.

The butter greeted him politely and explained that the ceiling had moved into another room because it was tired of being above everything.`,

`Gregory opened the refrigerator door and discovered a small staircase made of cheese.

The staircase introduced itself as Mr. Stairs and apologized because it had accidentally become a vegetable yesterday.`,

`Outside the house, Gregory found a stone made entirely of scissors sitting beside an old mailbox.

The stone explained that it was searching for a missing Tuesday that escaped through a hole in the calendar.`,

`The mailbox offered directions, but unfortunately the directions were written in invisible ink made from sleeping water.

Everyone agreed this was a normal problem.`

]

},



{
title:"Chapter Two: The Kingdom Of Confused Furniture",

pages:[

`The chairs gathered in the kitchen to discuss the important problem of floating vegetables.

The oldest chair suggested a solution involving umbrellas, mathematics, and a very emotional spoon.`,

`The table became the temporary king of the room after winning a competition about remembering the color purple.

The lamp congratulated the table and immediately transformed into a small mountain.`,

`The mountain requested a cup of tea, but received a bicycle instead.

Nobody corrected the mistake because bicycles often taste like Thursday.`,

`The sofa wrote a letter to the floor asking why everyone was walking above it.

The floor replied that it was currently too busy being horizontal.`

]

},



{
title:"Chapter Three: The Stone Made Of Scissors",

pages:[

`The stone continued its journey through the forest.

It carried a suitcase containing invisible potatoes, three confused buttons, and a map that only showed places that did not exist.`,

`The trees asked where the stone was going.

The stone answered that it was searching for the mysterious area between yesterday and almost breakfast.`,

`A bird wearing a tiny jacket offered directions.

Unfortunately, the bird's directions were upside down and smelled like a forgotten staircase.`,

`The stone finally reached a river that flowed upward.

The river apologized and said it was practicing becoming a mountain.`,

`The mountain and the river exchanged names because they both felt their names were too normal.

The mountain became Mr. Water and the river became Rockington.`

]

},



{
title:"Chapter Four: The Sandwich Government",

pages:[

`The sandwiches created a government inside the refrigerator.

Their first law was that every spoon must learn how to whistle underwater.`,

`The second law was that all sandwiches must wear extremely small hats during important meetings.

Nobody knew why, but everyone agreed it looked official.`,

`Gregory the paper attended the meeting and accidentally became the minister of folded objects.

His first decision was to make rectangles slightly more suspicious.`,

`The refrigerator applauded loudly, even though refrigerators do not normally have hands.

This was considered a historic achievement.`,

`A potato entered the meeting and announced that it had discovered a new shape.

The shape was called almost-circle-but-not-really.`

]

},



{
title:"Chapter Five: The Final Tuesday",

pages:[

`The moon arrived carrying a suitcase full of sleepy calendars.

It announced that the final Tuesday was approaching, although nobody knew what that meant.`,

`The furniture prepared for the event by polishing the walls and teaching the curtains how to dance.

The curtains were excellent dancers but terrible listeners.`,

`Gregory looked back at his strange adventure and realized something important:

Nobody had explained anything.

Everyone was satisfied.`,

`The final Tuesday arrived wearing a blue hat and carrying a sandwich.

It thanked everyone for attending and quietly turned into a chair.

The chair was never questioned.`,

`After everything ended, the refrigerator closed itself and whispered:

"Perhaps tomorrow will become a spoon."

Nobody understood.

That was considered perfect.`

]

}

];





// =====================================
// Create chapter pages
// =====================================


let pageNumber = 1;



chapters.forEach(chapter => {



    const chapterPage = document.createElement("div");

    chapterPage.className = "page";


    chapterPage.innerHTML = `

    <div class="page-content">

        <h2>
            ${chapter.title}
        </h2>

    </div>

    `;


    container.appendChild(chapterPage);



    chapter.pages.forEach(text => {



        const page = document.createElement("div");


        page.className = "page";



        page.innerHTML = `

        <div class="page-content">

            <p>
                ${text}
            </p>

        </div>


        <div class="page-number">

            ${pageNumber}

        </div>

        `;



        container.appendChild(page);


        pageNumber++;


    });


});





// =====================================
// Start page flip
// =====================================


const pageFlip = new St.PageFlip(

    document.getElementById("book"),

    {

        width:500,

        height:700,


        size:"fixed",


        showCover:true,


        drawShadow:true,


        maxShadowOpacity:0.35,


        flippingTime:900,


        usePortrait:false,


        mobileScrollSupport:false

    }

);



pageFlip.loadFromHTML(

    document.querySelectorAll(".page")

);