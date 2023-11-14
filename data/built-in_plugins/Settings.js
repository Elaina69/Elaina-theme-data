import { autoHonor } from "./Auto_honor.js"

export function init(context) {
    const themeTab = {
        "statements":[
            ["open-element","lol-uikit-scrollable",[]],
            ["static-attr","class","theme_settings"],
            ["flush-element"],
                ["close-element"]
        ],
        "locals":[],
        "named":[],
        "yields":[],
        "blocks":[],
        "hasPartials":false
    }
    const pluginsTab = {
        "statements":[
            ["open-element","lol-uikit-scrollable",[]],
            ["static-attr","class","plugins_settings"],
            ["flush-element"],
                ["close-element"]
        ],
        "locals":[],
        "named":[],
        "yields":[],
        "blocks":[],
        "hasPartials":false
    }
    const about = {
        "statements":[
            ["open-element","lol-uikit-scrollable",[]],
            ["static-attr","class","aboutus_settings"],
            ["flush-element"],
                ["close-element"]
        ],
        "locals":[],
        "named":[],
        "yields":[],
        "blocks":[],
        "hasPartials":false
    }

    context.rcp.postInit('rcp-fe-lol-settings', async (api) => {
        window.__RCP_SETTINGS_API = api

        let ember_api = window.__RCP_EMBER_API
        let ember = await ember_api.getEmber()

        let newGroup = {
            name: 'elaina-v3',
            titleKey: 'el_title',
            capitalTitleKey: 'el_title_capital',
            categories:[]
        }

        newGroup.categories.push({
            name: 'el-theme-settings',
            titleKey: 'el_theme-settings',
            routeName: 'el-theme-settings',
            group: newGroup,
            loginStatus: true,
            requireLogin: false,
            forceDisabled: false,
            computeds: ember.Object.create({
                disabled: false
            }),
            isEnabled: () => true,
        })

        newGroup.categories.push({
            name: 'el-plugins-settings',
            titleKey: 'el_plugins-settings',
            routeName: 'el-plugins-settings',
            group: newGroup,
            loginStatus: true,
            requireLogin: false,
            forceDisabled: false,
            computeds: ember.Object.create({
                disabled: false
            }),
            isEnabled: () => true,
        })
        newGroup.categories.push({
            name: 'el-aboutus-settings',
            titleKey: 'el_aboutus-settings',
            routeName: 'el-aboutus-settings',
            group: newGroup,
            loginStatus: true,
            requireLogin: false,
            forceDisabled: false,
            computeds: ember.Object.create({
                disabled: false
            }),
            isEnabled: () => true,
        })

        api._modalManager._registeredCategoryGroups.splice(1, 0, newGroup)
        api._modalManager._refreshCategoryGroups()
    })

    context.rcp.postInit('rcp-fe-ember-libs', async (api) => {
        window.__RCP_EMBER_API = api

        let ember = await api.getEmber()

        let originalExtend = ember.Router.extend
        ember.Router.extend = function() {
            let result = originalExtend.apply(this, arguments)

            result.map(function() {
                this.route('el-theme-settings')
                this.route('el-plugins-settings')
                this.route('el-aboutus-settings')
            })

            return result
        }
    },

    context.rcp.postInit('rcp-fe-lol-l10n', async (api) => {
        let tra = api.tra()

        let originalGet = tra.__proto__.get
        tra.__proto__.get = function(key) {
            if (key.startsWith('el_')) {
                switch (key) {
                    case 'el_title': return 'Elaina-V3'
                    case 'el_title_capital': return 'ELAINA-V3'
                    case 'el_theme-settings': return 'THEME SETTINGS'
                    case 'el_plugins-settings': return 'PLUGINS SETTINGS'
                    case 'el_aboutus-settings': return 'ABOUT US'
                    default: break;
                }
            }

            return originalGet.apply(this, [key]);
        }
    }),

    context.rcp.postInit('rcp-fe-ember-libs', async (api) => {
        window.__RCP_EMBER_API = api

        let ember = await api.getEmber()

        let originalExtend = ember.Router.extend
        ember.Router.extend = function() {
            let result = originalExtend.apply(this, arguments)
            result.map(function() {
                this.route('el-theme-settings')
                this.route('el-plugins-settings')
                this.route('el-aboutus-settings')
            })

            return result
        }

        let factory = await api.getEmberApplicationFactory()

        let originalBuilder = factory.factoryDefinitionBuilder
        factory.factoryDefinitionBuilder = function() {
            let builder = originalBuilder.apply(this, arguments)
            let originalBuild = builder.build
            builder.build = function() {
                let name = this.getName()
                if (name == 'rcp-fe-lol-settings') {
                    window.__SETTINGS_OBJECT = this

                    this.addTemplate('el-theme-settings', ember.HTMLBars.template({
                        id: "ElainaThemeSettings",
                        block: JSON.stringify(themeTab),
                        meta: {}
                    }))
                    this.addTemplate('el-plugins-settings', ember.HTMLBars.template({
                        id: "ElainaPluginsSettings",
                        block: JSON.stringify(pluginsTab),
                        meta: {}
                    }))
                    this.addTemplate('el-aboutus-settings', ember.HTMLBars.template({
                        id: "ElainaAboutUsSettings",
                        block: JSON.stringify(about),
                        meta: {}
                    }))
                }
                
                return originalBuild.apply(this, arguments)
            }
            return builder
        }
    }))
    
    autoHonor(context)
}