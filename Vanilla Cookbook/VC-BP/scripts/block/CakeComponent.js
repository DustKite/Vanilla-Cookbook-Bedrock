var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { system, StartupEvent, ItemComponentTypes, PlayerBreakBlockBeforeEvent, world, GameMode } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemUtil } from "../lib/ItemUtil";
import { methodEventSub } from "../lib/eventHelper";
export class CakeComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlayerInteract(args) {
        const block = args.block;
        const player = args.player;
        const dimension = args.dimension;
        const stage = Number(block.permutation.getState("vanillacookbook:cake_stage"));
        const blockType = block.typeId;
        const inventory = player?.getComponent("inventory");
        if (!inventory) return;
        
        const container = inventory?.container;
        const itemStack = container.getItem(player.selectedSlotIndex);
        const hunger = player.getComponent('minecraft:player.hunger');
        const saturation = player.getComponent('minecraft:player.saturation');
        
        if (!hunger || !saturation) return;
        let hungerRestore = 2;
        let saturationRestore = 0.4;
        let sound = "random.eat";
        let maxStage = 6;
        let removeEffects = false;
        let teleportEnabled = false;

        switch (blockType) {
            case "vanillacookbook:pancake_stack":
                hungerRestore = 5;
                saturationRestore = 6.6;
                maxStage = 4;
                break;
            case "vanillacookbook:brownie_tray":
                hungerRestore = 6;
                saturationRestore = 6.6;
                maxStage = 5;
                break;
            case "vanillacookbook:chorus_cake":
                hungerRestore = 4;
                saturationRestore = 6.8;
                if (stage < maxStage) {
                    sound = "mob.endermen.portal";
                }
                teleportEnabled = true;
                break;
            case "vanillacookbook:cheesecake":
                removeEffects = true;
                break;
        }
        if (itemStack && itemStack.hasTag("farmersdelight:is_knife")) {
            let baseItemId;
            const [namespace, name] = blockType.split(":");
            if (blockType === "vanillacookbook:pancake_stack") {
                baseItemId = "vanillacookbook:pancake";
            } else if (blockType === "vanillacookbook:brownie_tray") {
                baseItemId = "vanillacookbook:brownie";
            } else {
                baseItemId = "farmerscookbook:" + name + "_slice";
            }
            if (teleportEnabled && this.teleportCake(block, dimension, stage, maxStage)) {
                ItemUtil.spawnItem(block, baseItemId);
                if (stage < maxStage) {
                    player.playSound("mob.endermen.portal");
                } else {
                    player.playSound("use.cloth");
                }
                if (player?.getGameMode() != GameMode.Creative) {
                    ItemUtil.damageItem(container, player.selectedSlotIndex);
                }
                return;
            }
            if (stage < maxStage) {
                block.setPermutation(block.permutation.withState("vanillacookbook:cake_stage", stage + 1));
                ItemUtil.spawnItem(block, baseItemId);
                player.playSound("use.cloth");
            } else {
                dimension.setBlockType(block.location, "minecraft:air");
                ItemUtil.spawnItem(block, baseItemId);
                player.playSound("use.cloth");
            }
            if (player?.getGameMode() != GameMode.Creative) {
                ItemUtil.damageItem(container, player.selectedSlotIndex);
            }
            return;
        }
        if (player?.getGameMode() != GameMode.Creative) {
            const hungerEffect = player.getEffect("hunger");
            if (hunger.currentValue >= hunger.effectiveMax && !hungerEffect) {
                return;
            }
        }
        if (teleportEnabled && this.teleportCake(block, dimension, stage, maxStage)) {
            this.restoreHunger(hunger, saturation, hungerRestore, saturationRestore);
            player.playSound(sound);
            return;
        }
        this.restoreHunger(hunger, saturation, hungerRestore, saturationRestore);
        player.playSound(sound);
        if (removeEffects) {
            const effects = player.getEffects();
            for (const effect of effects) {
                player.removeEffect(effect.typeId);
            }
        }
        if (stage < maxStage) {
            block.setPermutation(block.permutation.withState("vanillacookbook:cake_stage", stage + 1));
        } else {
            dimension.setBlockType(block.location, "minecraft:air");
        }
    }
    break(args) {
        const block = args.block;
        const cake = block.getComponent('vanillacookbook:cake');
        if (!cake) return;
        const itemStack = args.itemStack;
        const stage = Number(block.permutation.getState("vanillacookbook:cake_stage"));
        const player = args.player;
        const { x, y, z } = block.location;
        const container = player.getComponent("inventory")?.container;
        if (!itemStack) return;
        const enchant = itemStack.getComponent(ItemComponentTypes.Enchantable);
        const silkTouch = enchant?.getEnchantment('silk_touch');
        if (silkTouch && stage === 0) {
            args.cancel = true;
            if (!container) return;
            system.runTimeout(() => {
                player.playSound("use.cloth");
                ItemUtil.spawnItem(block, block.typeId);
                block.dimension.runCommand(`setblock ${x} ${y} ${z} air`);
                if (player?.getGameMode() != GameMode.Creative) {
                   ItemUtil.damageItem(container, player.selectedSlotIndex);
                }
            });
        } else if (stage > 0) {
            args.cancel = true;
            system.runTimeout(() => {
                block.dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`);
                if (container) {
                    if (player?.getGameMode() != GameMode.Creative) {
                       ItemUtil.damageItem(container, player.selectedSlotIndex);
                    }
                }
            });
        }
    }
    restoreHunger(hunger, saturation, hungerRestore, saturationRestore) {
        hunger.setCurrentValue(Math.min(hunger.currentValue + hungerRestore, hunger.effectiveMax));
        saturation.setCurrentValue(Math.min(saturation.currentValue + saturationRestore, saturation.effectiveMax));
    }
    teleportCake(block, dimension, currentStage, maxStage) {
        const originalLoc = block.location;
        const range = 8;
        const maxAttempts = 1000;
        const nonSolidKeywords = [
            "air", "void", "barrier", "light_block", "structure_void",
            "water", "lava", "flowing_", "bubble_column", "frosted_ice",
            "painting", "item_frame",
            "plant", "flower", "fern", "sapling", "mushroom", "vine", 
            "bush", "shrub", "grass", "roots", "moss", "lichen",
            "seed", "crop", "pumpkin_stem", "melon_stem",
            "dead_bush", "sweet_berry_bush", "hanging_roots", "weeping_vines", 
            "twisting_vines", "leaf_litter", "tall_grass", "short_grass", 
            "pink_petals", "small_dripleaf", "big_dripleaf", "amethyst_cluster", 
            "pointed_dripstone", "glow_berries", "moss_carpet",
            "rose", "poppy", "dandelion", "blue_orchid", "allium", 
            "azure_bluet", "tulip", "oxeye_daisy", "cornflower", "lily_of_the_valley", 
            "wither_rose", "sunflower", "lilac", "peony", "rose_bush", 
            "pitcher_plant", "torchflower",
            "bamboo", "cactus", "sugar_cane", "kelp", "seagrass", "coral", "algae",
            "lily_pad", "sea_pickle", "spore_blossom", "dripstone", "berry",
            "azalea", "bud", "cluster", "propogule", "petals",
            "fire", "magma", "powder_snow", "sculk_vein", "web", "slime",
            "slab", "stairs", "fence", "wall", "gate", "pane", "bars", "scaffolding", "ladder",
            "door", "trapdoor", "torch", "lantern", "candle", "end_rod", "chain",
            "button", "lever", "pressure_plate", "tripwire", "sensor", "daylight_detector",
            "rail", "redstone", "comparator", "repeater", "dust",
            "hopper", "cauldron", "composter", "brewing_stand", "lectern",
            "grindstone", "stonecutter", "camp_fire", "bell",
            "piston", "observer", "dispenser", "dropper","cake",
            "carpet", "snow_layer", "skull", "head", "banner", "sign", "pot",
            "wild", "tomato","potato","cabbage", "rice", "pineapple", "cotton", "toast", "luncheon",
            "pie", "tatami", "rich", "skillet", "cutting_board", "medley","eggplant", "fennel","greenonion",
            "garlic", "dumpling", "cheese", "sushi", "deep_frying_pan", "quiche_lorraine", "dumpling",
            "paper_wrapped_fish", "stuffed"
        ];
        const isSuitableLocation = (targetLoc) => {
            const targetBlock = dimension.getBlock(targetLoc);
            if (!targetBlock || !targetBlock.isAir) return false;
            const belowLoc = {
                x: targetLoc.x,
                y: targetLoc.y - 1,
                z: targetLoc.z
            };
            const belowBlock = dimension.getBlock(belowLoc);
            if (!belowBlock) return false;
            if (belowBlock.isAir || belowBlock.isLiquid) return false;
            const belowId = belowBlock.typeId.toLowerCase();
            if (belowId === "minecraft:grass_block") return true;
            if (belowId.includes("grass")) {
                return false;
            }
            for (const keyword of nonSolidKeywords) {
                if (belowId.includes(keyword)) {
                    return false;
                }
            }
            return true;
        };
        for (let i = 0; i < maxAttempts; i++) {
            const dx = Math.floor(Math.random() * (range * 2 + 1)) - range;
            const dy = Math.floor(Math.random() * (range * 2 + 1)) - range;
            const dz = Math.floor(Math.random() * (range * 2 + 1)) - range;
            const targetX = originalLoc.x + dx;
            const targetY = originalLoc.y + dy;
            const targetZ = originalLoc.z + dz;
            if (targetY < -64 || targetY > 320) continue;
            const targetLoc = { x: targetX, y: targetY, z: targetZ };
            if (isSuitableLocation(targetLoc)) {
                if (currentStage === maxStage) {
                    dimension.setBlockType(originalLoc, "minecraft:air");
                } else {
                    dimension.setBlockType(targetLoc, block.typeId);
                    const newBlock = dimension.getBlock(targetLoc);
                    if (newBlock) {
                        newBlock.setPermutation(block.permutation.withState("vanillacookbook:cake_stage", (currentStage + 1)));
                    }
                    dimension.setBlockType(originalLoc, "minecraft:air");
                }
                return true;
            }
        }
        return false;
    }
    
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('vanillacookbook:cake', new CakeComponent());
    }
}
__decorate([
    EventAPI.register(system.beforeEvents.startup),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StartupEvent]),
    __metadata("design:returntype", void 0)
], CakeComponent.prototype, "register", null);
__decorate([
    methodEventSub(world.beforeEvents.playerBreakBlock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerBreakBlockBeforeEvent]),
    __metadata("design:returntype", void 0)
], CakeComponent.prototype, "break", null);