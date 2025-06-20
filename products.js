// products.js - FULLY CORRECTED VERSION

const allProducts =  [
    {
        id:"we-bare-bears-yellow",
        name: "MINISO We Bare Bears Plushie Toy",
        price: 29.00,
        images: ["yellow bear front.png", "yellow bear side.png", "yellow bear persp.png"],
        descriptionPoints: [
            { title: "Premium Quality", text: "The toy is ultra soft and velvet feeling which is durable, washable, and not easy to deform."}, 
            { title: "IP Design", text: "Officially licensed We Bare Bears produced by MINISO. The bear features adorable facial expression hugging a red heart made it much realistic looking and lovely." }, 
            { title:"Huggable Companion", text: "This snuggly, adorable, and stuffed bear plush toys will become your friends in your daily life. Kids, teens, and adults will enjoy the companion of this plushies"}
        ], 
        category: "toys-plushies",
        cartData: {
            id: "we-bare-bears-yellow",
            name: "Miniso We Bare Bears Plushie Toy",
            price: 29.00,
            imageSrc: "yellow bear front.png",
            description: "9 inches tall"
        }
    },
    {
        id:"we-bare-bears-panda-halloween",
        name:"MINISO We Bare Bears Panda Halloween Plushie Toy",
        price: 29.00,
        images: ["bear in halloween purple.png"],
        descriptionPoints: [
            { title: "Festive Fun", text: "Perfect for Halloween, this Panda is dressed to spook and delight." }, 
            { title: "Soft & Cuddly", text: "Made with MINISO's signature soft materials, great for hugs." }
        ],
        category: "toys-plushies",
        cartData: {
            id: "we-bare-bears-panda-halloween", // Corrected this ID from 'panda-halloween'
            name: "MINISO We Bare Bears Panda Halloween Plushie Toy",
            price: 29.00,
            imageSrc: "bear in halloween purple.png",
            description: "Halloween Special Edition"
        }
    },
    {
        id: "panda-plushie",
        name: "MINISO We Bare Bears Panda Plushie Toy",
        price: 30.00, 
        images: ["panda persp.png"], // Corrected main image
        descriptionPoints: [
            { title: "Classic Panda", text: "The iconic Panda from We Bare Bears, ready for adventure."},
            { title: "High Quality", text: "Durable and made with love by MINISO." }
        ],
        category: "toys-plushies", // Corrected category
        cartData: {
            id: "panda-plushie",
            name: "MINISO We Bare Bears Panda Plushie Toy",
            price: 30.00,
            imageSrc: "panda persp.png",
            description: "Classic Panda Design"
        }
    },
    {
        id: "sakura-cat",
        name: "MINISO Sakura Cat Plushie Toy",
        price: 30.00,
        images: ["cat front.png"],
        descriptionPoints: [
            { title: "Adorable Design", text: "Charming Sakura-themed cat plushie with a bell."},
            { title: "Perfect Gift", text: "A delightful gift for cat lovers and plushie collectors."}
        ],
        category: "toys-plushies", // Corrected category
        cartData: {
            id: "sakura-cat",
            name: "MINISO Sakura Cat Plushie Toy",
            price: 30.00,
            imageSrc: "cat front.png",
            description: "Sakura Themed Cat"
        }
    },
    {
        id: "pink-penguin",
        name: "MINISO Pink Penguin Plushie Toy",
        price: 22.00,
        images: ["penguin pink.png"],
        descriptionPoints: [
            { title: "Sweet & Soft", text: "A very soft and squishy pink penguin, perfect for cuddles."},
            { title: "Unique Character", text: "Add this cute penguin to your collection."}
        ],
        category: "toys-plushies",
        cartData: {
            id: "pink-penguin",
            name: "MINISO Pink Penguin Plushie Toy",
            price: 22.00, 
            imageSrc: "penguin pink.png",
            description: "Cuddly Pink Penguin"
        }
    }, 
    {
        id: "fragrance1",
        name: "MINISO Autumn Love Fragrance",
        price: 15.00,
        images: ["fragrance 1.png", "fragrance_detail.png"],
        descriptionPoints: [
            { title: "Scent Profile", text: "A warm and inviting autumn scent."},
            { title: "Long Lasting", text: "Enjoy the fragrance throughout your day."}
        ],
        category: "beauty",
        cartData: {
            id: "fragrance1",
            name: "MINISO Autumn Love Fragrance",
            price: 15.00, 
            imageSrc: "fragrance 1.png",
            description: "100 ml Bottle"
        }
    }, 
    {
        id: "headphones1",
        name: "MINISO Bluetooth Headphones",
        price: 25.00,
        images: ["headphone 1 .png", "headphone 2.png", "headphones 3.png"],
        descriptionPoints: [
            { title: "Ease to Use", text: "Wireless, compact and portable."},
            { title: "Upmost Comfort", text: " Over-ear and comfortable"}
        ],
        category: "electronics",
        cartData: {
            id: "headphones1",
            name: "MINISO Bluetooth Headphones",
            price: 25.00, 
            imageSrc: "headphone 1 .png",
            description: "Wireless, Over-ear headphones"
        }
    }, 
    {
        id: "winniethepooh1",
        name: "MINISO Winnie the Pooh Handbag",
        price: 20.00,
        images: ["winnie the pooh bag.png", "winnie the pooh bag pt 2.png", "winnie the pooh bag pt 3.png"],
        descriptionPoints: [
            { title: "Sweet & Soft", text: "A very soft and cute handbag from our childhoods."},
            { title: "The Perfect Size", text: "Great for any occassion, fits all the essentials and then some."}
        ],
        category: "beauty",
        cartData: {
            id: "winniethepooh1",
            name: "MINISO Winnie the Pooh Handbag",
            price: 20.00, 
            imageSrc: "winnie the pooh bag.png",
            description: "Disney Winnie the Pooh bag"
        }
    }, 
    {
        id: "kuromimirror1",
        name: "MINISO Kuromi Makeup Mirror",
        price: 10.00,
        images: ["purple mirrors.png", "hello kitty mirrors.png"],
        descriptionPoints: [
            { title: "Vibrant and Colourful", text: "Creative and not your average makeup mirror"},
            { title: "The Perfect Size", text: "Great for any occassion, perfect for getting ready." }
        ],
        category: "beauty",
        cartData: {
            id: "kuromimirror1",
            name: "MINISO Kuromi Makeup Mirror",
            price: 10.00, 
            imageSrc: "purple mirrors.png",
            description: "purple Kuromi makeup mirror"
        }
    }, 
    {
        id: "diffuser1",
        name: "MINISO Orange Amber Diffuser",
        price: 15.00, // Corrected price
        images: ["candle aroma.png"],
        descriptionPoints: [
            { title: "Scent Profile", text: "A warm and inviting orange amber scent"},
            { title: "Long Lasting", text: "Your space can smell like orange amber for up to 30 days" }
        ],
        category: "homeware",
        cartData: {
            id: "diffuser1",
            name: "MINISO Orange Amber Diffuser",
            price: 15.00, 
            imageSrc: "candle aroma.png",
            description: "candle aroma diffuser"
        }
    }, 
    {
        id: "oink-plushie",
        name: "MINISO Oink Plushie Toy",
        price: 22.00,
        images: ["pig 1.png", "pig 2.png", "pig 3.png"],
        descriptionPoints: [
           { title: "Sweet & Soft", text: "A very soft and squishy pink pig, perfect for cuddles."},
           { title: "Perfect Gift", text: "A delightful gift for piglet lovers and plushie collectors."}
        ],
        category: "toys-plushies", // Corrected category
        cartData: {
            id: "oink-plushie",
            name: "MINISO Oink Plushie Toy",
            price: 22.00, 
            imageSrc: "pig 1.png",
            description: "9 inches wide"
        }
    }, 
    {
        id: "mickey-mouse",
        name: "MINISO Mickey Mouse Plushie Toy Disney",
        price: 27.00,
        images: ["mickey miniso.png", "minnie and mickey 4 bags.png"],
        descriptionPoints: [
           { title: "Sweet & Soft", text: "A very soft and cute Mickey Mouse plushie, perfect for cuddles."},
           { title: "Perfect Gift", text: "A delightful gift for Disney lovers and plushie collectors."}
        ],
        category: "toys-plushies", // Corrected category
        cartData: {
            id: "mickey-mouse", // CORRECTED ID
            name: "MINISO Mickey Mouse Plushie Toy Disney",
            price: 27.00, 
            imageSrc: "mickey miniso.png",
            description: "6 inches wide"
        }
    }, 
    {
        id: "capybara",
        name: "MINISO Capybara Plushie Toy",
        price: 30.00,
        images: ["capybara.png"],
        descriptionPoints: [
           { title: "Sweet & Soft", text: "A very soft and cute capybara plushie, perfect for cuddles."},
           { title: "Perfect Gift", text: "A delightful gift for capybara lovers and plushie collectors."}
        ],
        category: "toys-plushies", // Corrected category
        cartData: {
            id: "capybara",
            name: "MINISO Capybara Plushie Toy",
            price: 30.00, 
            imageSrc: "capybara.png",
            description: "9 inches tall"
        }
    }, 
    {
        id: "minnie-mouse",
        name: "MINISO Minnie Mouse Plushie Toy Disney",
        price: 27.00,
        images: ["mickey bag 2.png", "minnie and mickey 4 bags.png"],
        descriptionPoints: [
           { title: "Sweet & Soft", text: "A very soft and cute Minnie Mouse plushie, perfect for cuddles."},
           { title: "Perfect Gift", text: "A delightful gift for Minnie Mouse lovers and plushie collectors."}
        ],
        category: "toys-plushies", // Corrected category
        cartData: {
            id: "minnie-mouse", // CORRECTED ID
            name: "MINISO Minnie Mouse Plushie Toy Disney", // CORRECTED NAME
            price: 27.00, 
            imageSrc: "mickey bag 2.png", // CORRECTED IMAGE
            description: "6 inches wide"
        }
    }
];