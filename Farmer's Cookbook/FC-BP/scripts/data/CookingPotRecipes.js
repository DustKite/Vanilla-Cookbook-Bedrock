const cookingPotRecipes = [
    {
        "identifer": "vanillacookbook:pudding",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:sugar" },
            { "tag": "minecraft:egg" },
            { "tag": "farmersdelight:is_milk" }
        ],
        "result": {
            "item": "vanillacookbook:pudding"
        }
    },
    {
        "identifer": "vanillacookbook:glow_ink_soup",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 0.35,
        "ingredients": [
            { "item": "minecraft:glow_ink_sac" },
            { "item": "minecraft:glow_ink_sac" }
        ],
        "result": {
            "item": "vanillacookbook:glow_ink_soup"
        }
    },
    {
        "identifer": "vanillacookbook:mushroom_scrambled_eggs",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            [
                { "item": "minecraft:red_mushroom" },
                { "item": "minecraft:brown_mushroom" }
            ],
            [
                { "item": "minecraft:red_mushroom" },
                { "item": "minecraft:brown_mushroom" }
            ],
            { "tag": "minecraft:egg" },
            { "tag": "farmersdelight:is_milk" }
        ],
        "result": {
            "item": "vanillacookbook:mushroom_scrambled_eggs"
        }
    },
    {
        "identifer": "vanillacookbook:mashed_potatoes",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:potato" },
            { "item": "minecraft:potato" },
            { "tag": "farmersdelight:is_milk" }
        ],
        "result": {
            "item": "vanillacookbook:mashed_potatoes"
        }
    },
    {
        "identifer": "vanillacookbook:cheese",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 200,
        "experience": 0.35,
        "ingredients": [
            { "tag": "farmersdelight:is_milk" }
        ],
        "result": {
            "item": "vanillacookbook:cheese"
        }
    },
    {
        "identifer": "vanillacookbook:garden_soup",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:carrot" },
            { "item": "minecraft:potato" },
            { "item": "minecraft:beetroot" }
        ],
        "result": {
            "item": "vanillacookbook:garden_soup"
        }
    },
    {
        "identifer": "vanillacookbook:meaty_stew",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            [
                { "item": "minecraft:beef" },
                { "item": "minecraft:chicken" },
                { "item": "minecraft:mutton" },
                { "item": "minecraft:porkchop" },
                { "item": "minecraft:rabbit" },
                { "tag": "farmersdelight:is_raw_chicken" },
                { "tag": "farmersdelight:is_raw_porkchop" },
                { "tag": "farmersdelight:is_raw_beef" },
                { "tag": "farmersdelight:is_raw_mutton" },
            ],
            { "item": "minecraft:bone" },
            { "item": "minecraft:bone" },
            { "item": "minecraft:carrot" }
        ],
        "result": {
            "item": "vanillacookbook:meaty_stew"
        }
    },
    {
        "identifer": "vanillacookbook:ink_soup",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 0.35,
        "ingredients": [
            { "item": "minecraft:ink_sac" },
            { "item": "minecraft:ink_sac" }
        ],
        "result": {
            "item": "vanillacookbook:ink_soup"
        }
    },
    {
        "identifer": "vanillacookbook:fungus_stew",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            [
                { "item": "minecraft:crimson_fungus" },
                { "item": "minecraft:warped_fungus" }
            ],
            [
                { "item": "minecraft:crimson_fungus" },
                { "item": "minecraft:warped_fungus" }
            ]
        ],
        "result": {
            "item": "vanillacookbook:fungus_stew"
        }
    },
    {
        "identifer": "vanillacookbook:cooked_sniffer_egg",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 200,
        "experience": 0.35,
        "ingredients": [
            { "item": "minecraft:sniffer_egg" }
        ],
        "result": {
            "item": "vanillacookbook:cooked_sniffer_egg"
        }
    },
    {
        "identifer": "vanillacookbook:pumpkin_soup",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:pumpkin" },
            { "item": "minecraft:pumpkin_seeds" },
            { "item": "minecraft:pumpkin_seeds" }
        ],
        "result": {
            "item": "vanillacookbook:pumpkin_soup"
        }
    },
    {
        "identifer": "vanillacookbook:jelly",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:slime_ball" },
            { "item": "minecraft:sugar" }
        ],
        "result": {
            "item": "vanillacookbook:jelly"
        }
    },
    {
        "identifer": "vanillacookbook:magma_jelly",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:magma_cream" },
            { "item": "minecraft:sugar" }
        ],
        "result": {
            "item": "vanillacookbook:magma_jelly"
        }
    },
    {
        "identifer": "vanillacookbook:vegetable_stew",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:carrot" },
            [
                { "item": "minecraft:potato" },
                { "item": "minecraft:beetroot" }
            ],
            [
                { "item": "minecraft:potato" },
                { "item": "minecraft:beetroot" }
            ],
            { "item": "minecraft:pumpkin" },
            [
                { "item": "minecraft:red_mushroom" },
                { "item": "minecraft:brown_mushroom" }
            ],
            { "item": "minecraft:kelp" }
        ],
        "result": {
            "item": "vanillacookbook:vegetable_stew"
        }
    },
    {
        "identifer": "vanillacookbook:cooked_egg",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 200,
        "experience": 0.35,
        "ingredients": [
            { "tag": "minecraft:egg" }
        ],
        "result": {
            "item": "vanillacookbook:cooked_egg"
        }
    },
    {
        "identifer": "vanillacookbook:fish_stew",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            [
                { "item": "minecraft:fish" },
                { "item": "minecraft:clownfish" },
                { "item": "minecraft:salmon" },
                { "tag": "farmersdelight:is_raw_fish" }
            ],
            [
                { "item": "minecraft:fish" },
                { "item": "minecraft:clownfish" },
                { "item": "minecraft:salmon" },
                { "tag": "farmersdelight:is_raw_fish" }
            ]
        ],
        "result": {
            "item": "vanillacookbook:fish_stew"
        }
    },
    {
        "identifer": "vanillacookbook:cooked_turtle_egg",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 200,
        "experience": 0.35,
        "ingredients": [
            { "item": "minecraft:turtle_egg" }
        ],
        "result": {
            "item": "vanillacookbook:cooked_turtle_egg"
        }
    },
    {
        "identifer": "vanillacookbook:cooked_bamboo",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 200,
        "experience": 0.35,
        "ingredients": [
            { "item": "minecraft:bamboo" }
        ],
        "result": {
            "item": "vanillacookbook:cooked_bamboo"
        }
    },
    {
        "identifer": "vanillacookbook:apple_sauce",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 0.35,
        "ingredients": [
            { "item": "minecraft:apple" },
            { "item": "minecraft:sugar" },
            { "item": "minecraft:sugar" }
        ],
        "result": {
            "item": "vanillacookbook:apple_sauce"
        }
    },
    {
        "identifer": "vanillacookbook:cooked_beetroot",
        "tags": ["cooking_pot"],
        "priority": 0,
        "time": 200,
        "experience": 0.35,
        "ingredients": [
            { "item": "minecraft:beetroot" }
        ],
        "result": {
            "item": "vanillacookbook:cooked_beetroot"
        }
    },
    {
        "identifer": "vanillacookbook:smoldering_stew",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:magma_cream" },
            { "item": "minecraft:nether_wart" },
            { "item": "minecraft:nether_wart" }
        ],
        "result": {
            "item": "vanillacookbook:smoldering_stew"
        }
    },
    {
        "identifer": "vanillacookbook:chicken_soup",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            [
                { "tag": "farmersdelight:is_raw_chicken" },
                { "item": "minecraft:chicken" }
            ],
            { "item": "minecraft:carrot" },
            { "item": "minecraft:carrot" }
        ],
        "result": {
            "item": "vanillacookbook:chicken_soup"
        }
    },
    {
        "identifer": "vanillacookbook:chocolate_pudding",
        "tags": ["cooking_pot"],
        "container": {
            "item": "minecraft:bowl"
        },
        "priority": 0,
        "time": 200,
        "experience": 1.0,
        "ingredients": [
            { "item": "minecraft:sugar" },
            { "tag": "minecraft:egg" },
            { "tag": "farmersdelight:is_milk" },
            { "item": "minecraft:cocoa_beans" }
        ],
        "result": {
            "item": "vanillacookbook:chocolate_pudding"
        }
    }
];

export { cookingPotRecipes };