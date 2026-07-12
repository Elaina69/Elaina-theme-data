export default {
    "1/1": {
        "Day"    : "1/1",
        "Text"   : "Happy new year !!",
        "Image"  : [
            "01-01/NewYear_2024.jpg", 
            "01-01/NewYear_2025.jpg"
        ],
        "filters": "brightness(0.8)",
        "nsfw"   : false
    },
    "1/2": {
        "Day"    : "1/2",
        "Text"   : "Elaina theme's 4th Anniversary !!",
        "Image"  : [
            "02-01/Anniversary_2.webp",
            "02-01/Anniversary_4.webp"
        ],
        "filters": "brightness(1.0)",
        "nsfw"   : false
    },
    "9/3": {
        "Day"    : "9/3",
        "Text"   : "Okaimono~~~ Okaimono~~~ ",
        "Image"  : [
            "03-09/static-miku.jpg"
        ],
        "filters": "brightness(1.0)",
        "nsfw"   : false
    },
    "1/3": {
        "Day"    : "1/3",
        "Title"  : "Ho-kago Tea Time",
        "Text"   : "\"Graduation isn't the end...\"",
        "Image"  : [],
        "Video"  : {
            "path"       : "assets/video/K-ON_Tenshi ni Fureta yo!-compressed.webm",
            "source"     : "data",
            "width"      : "720px",
            "volume"     : 0.15,
            "attributes" : {
                "autoplay": true
            }
        },
        "DialogWidth": "800px",
        "DataKey"    : "1/3",
        "IgnoreHolidayMessageSetting": true,
        "Actions"    : {
            "beforeShow"  : ["pauseAudioIfPlaying"],
            "buttonClose" : ["pauseVideo", "hideModal", "pauseAudioIfPlaying"],
            "frameClose"  : ["hideModal"],
            "skipped"     : ["removeDataKey"]
        },
        "filters": "",
        "nsfw"   : false
    },
    "1/4": {
        "Day"    : "1/4",
        "Title"  : "Elaina_V4",
        "Text"   : "\"Happy 1/4\"",
        "Image"  : [],
        "Video"  : {
            "path"       : "assets/1-4.webm",
            "source"     : "server",
            "width"      : "250px",
            "volume"     : 0.15,
            "attributes" : {
                "controls": true
            }
        },
        "DialogWidth": "400px",
        "DataKey"    : "3rd-1/4",
        "IgnoreHolidayMessageSetting": true,
        "Actions"    : {
            "buttonClose" : ["pauseVideo", "hideModal", "rickRoll"],
            "frameClose"  : ["hideModal", "rickRoll"]
        },
        "filters": "",
        "nsfw"   : false
    },
    "1/6": {
        "Day"    : "1/6",
        "Text"   : "Welcome summer !!",
        "Image"  : [
            "06-01/Summer_1.jpg",
            "06-01/Summer_2.jpg",
            "06-01/Summer_3.webp"
        ],
        "filters": "brightness(1.0)",
        "nsfw"   : false
    },
    "5/7": {
        "Day"    : "5/7",
        "Text"   : "Just a normal day, but let's enjoy it with Elaina !!",
        "Image"  : [
            "07-05/Normal_1.webp",
        ],
        "filters": "",
        "nsfw"   : false
    },
    "17/8": {
        "Day"    : "17/8",
        "Text"   : "Nyan~~~",
        "Image"  : [
            "08-17/SayaXElaina.webp"
        ],
        "filters": "brightness(1.0)",
        "nsfw"   : false
    },
    "17/10": {
        "Day"    : "17/10",
        "Text"   : "Happy birthday Elaina !!",
        "Image"  : [
            "10-17/ElainaBirthday_2025.jpg", 
            "10-17/ElainaBirthday_2026.jpg"
        ],
        "filters": "brightness(1.0)",
        "nsfw"   : false
    },
    "31/10": {
        "Day"    : "31/10",
        "Text"   : "Today, i will become Elaina, fr (=^ ◡ ^=)",
        "Image"  : [
            "10-31/Halloween_2023.jpg", 
            "10-31/Halloween_2024.jpg"
        ],
        "filters": "brightness(1.0)",
        "nsfw"   : false
    },
    "1/11": {
        "Day"    : "1/11",
        "Text"   : "Happy NNN day !!",
        "Image"  : [
            "11-01/nnn_2023.webp"
        ],
        "filters": "brightness(0.8)",
        "nsfw"   : false
    },
    "19/11": {
        "Day"    : "19/11",
        "Text"   : "Wolrd Skabidi Toilet Day!!",
        "Image"  : [
            "11-19/static-skabidi-toilet.webp"
        ],
        "filters": "brightness(1.0)",
        "nsfw"   : false
    },
    "1/12": {
        "Day"    : "1/12",
        "Text"   : "Goodbye, NNN and Welcoom, DDD !!",
        "Image"  : [
            "12-01/ddd_2023.webp",
            "12-01/ddd_2024.gif"
        ],
        "filters": "brightness(0.9)",
        "nsfw"   : true
    },
    "25/12": {
        "Day"    : "25/12",
        "Text"   : "Merry Christmas !!",
        "Image"  : [
            "12-25/Xmas_2023.jpg"
        ],
        "filters": "brightness(1.0)",
        "nsfw"   : false
    },

    "/": {
        "Day"    : "",
        "Text"   : "",
        "Image"  : [],
        "filters": "",
        "nsfw"   : false
    },
}
