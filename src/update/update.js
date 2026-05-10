export default {
    "version": "4.5.0",
    "key": 20260510450,
    "update-type": "Manual", // "Auto", "Manual", "New"
    "text": [
        "From Pengu 1.2.0, theme will use PluginFS to store user's data:",
        "- For no PluginFS pengu versions, theme will still use default DataStore",
        "- For PluginFS pengu versions, user's data will be stored in ./data/ElainaData/json, old data from DataStore will auto migrate to new ElainaData",
        'Added "Disable theme wallpaper" option',
        'Added "Hide gamemodes" option',
        "Sanitized HTML/colors",
        "Faster sync users icons (for Pengu 1.2.0+)",
        "Updated custom avatar in TFT and Arena lobby",
        "Allowed users to copy wallpaper/audio/banner/font files name inside theme settings (for no PluginFS pengu versions)",
        "Theme now auto detect wallpaper/audio/banner/font lists",
        "The homepage navigation bar will be hidden by default",
        "No longer forced client restarts when installing themes for the first time or deleting data.",
        "No longer auto play wallpaper and audio after enable theme's wallpaper/audio",
        'Removed "Aram only mode" plugin',
        'Removed "Custom practice lobby" button'
    ]
}