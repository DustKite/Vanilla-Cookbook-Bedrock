var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";

export class Food {
    eat(args) {
        const { itemStack, source: player, useDuration } = args;
        if (useDuration) return;

        const itemType = itemStack.typeId;
        const weight = Math.floor(Math.random() * 11);
        const effects = player.getEffects();
        const hunger = player.getComponent('minecraft:player.hunger');
        const saturation = player.getComponent('minecraft:player.saturation');

        switch (itemType) {
            case "vanillacookbook:cactus_slice":
                if (weight >= 5) player.applyDamage(2);
                break;
            case "vanillacookbook:cooked_cactus_slice":
                if (weight >= 8) player.applyDamage(1);
                break;
            case "vanillacookbook:ice_cream":
            case "vanillacookbook:chocolate_ice_cream":
            case "vanillacookbook:berry_ice_cream":
            case "vanillacookbook:neapolitan_ice_cream":
            case "vanillacookbook:pumpsicle":
            case "vanillacookbook:snow_horn":
                player.extinguishFire();
                break;
            case "vanillacookbook:cheese":
            case "vanillacookbook:stuffed_sea_pickle":
            case "farmerscookbook:cheesecake_slice":
            case "vanillacookbook:milk_bottle":
            case "vanillacookbook:chocolate_milk":
            case "vanillacookbook:berry_milk":
                for (const effect of effects) {
                    player.removeEffect(effect.typeId);
                }
                break;
            case "vanillacookbook:glow_ink_soup":
                player.addEffect('regeneration', 100, { amplifier: 0 });
                break;
            case "vanillacookbook:smoldering_stew":
                player.addEffect('fire_resistance', 200, { amplifier: 0 });
                break;
            case "vanillacookbook:golden_fruit_salad":
                player.addEffect('instant_health', 1, { amplifier: 0 });
                break;
            case "vanillacookbook:jelly":
            case "vanillacookbook:magma_jelly":
                if (weight >= 5) {
                    player.addEffect('oozing', 200, { amplifier: 0 });
                }
                break;
            case "vanillacookbook:glazed_glow_berries":
                player.addEffect('night_vision', 400, { amplifier: 0 });
                break;
            case "vanillacookbook:cotton_candy":
                player.addEffect('levitation', 5, { amplifier: 24 });
                break;
            case "vanillacookbook:sword_lollipop":
                player.addEffect('strength', 600, { amplifier: 0 });
                break;
            case "vanillacookbook:netherite_apple":
                player.addEffect('resistance', 6000, { amplifier: 1 });
                player.addEffect('fire_resistance', 6000, { amplifier: 0 });
                player.addEffect('haste', 6000, { amplifier: 1 });
                player.addEffect('absorption', 2400, { amplifier: 1 });
                break;
            case "vanillacookbook:apple_soda":
                player.addEffect('absorption', 400, { amplifier: 2 });
                break;
            case "vanillacookbook:berry_soda":
                player.addEffect('haste', 400, { amplifier: 1 });
                break;
            case "vanillacookbook:cactus_soda":
                player.addEffect('resistance', 400, { amplifier: 1 });
                break;
            case "vanillacookbook:melon_soda":
                player.addEffect('instant_health', 1, { amplifier: 1 });
                player.addEffect('regeneration', 400, { amplifier: 0 });
                break;
            case "vanillacookbook:sea_pickle_soda":
                player.addEffect('water_breathing', 400, { amplifier: 0 });
                player.addEffect('speed', 400, { amplifier: 0 });
                break;
            case "vanillacookbook:chorus_soda":
                player.addEffect('levitation', 200, { amplifier: 4 });
                player.addEffect('slow_falling', 240, { amplifier: 0 });
                break;
            case "vanillacookbook:poisonous_pie":
                player.addEffect('poison', 300, { amplifier: 2 });
                player.addEffect('nausea', 300, { amplifier: 0 });
                break;
            case "vanillacookbook:potato_chips":
            case "vanillacookbook:hot_potato_chips":
            case "vanillacookbook:beet_chips":
            case "vanillacookbook:apple_chips":
                if (weight >= 5) {
                    player.removeEffect('hunger');
                }
                break;
            case "vanillacookbook:honey_candy":
            case "vanillacookbook:berry_candy":
            case "vanillacookbook:chocolate":
                if (weight >= 8) {
                    player.removeEffect('hunger');
                }
                break;
            case "vanillacookbook:sculky_cheese":
                for (const effect of effects) {
                    player.removeEffect(effect.typeId);
                }
                const levelBonus = Math.floor(player.level / 6);
                if (levelBonus > 0 && hunger && saturation) {
                    hunger.setCurrentValue(Math.min(hunger.currentValue + levelBonus, hunger.effectiveMax));
                    saturation.setCurrentValue(Math.min(saturation.currentValue + (levelBonus * 2), saturation.effectiveMax));
                }
                break;
            case "vanillacookbook:the_sludge":
                if (hunger) hunger.setCurrentValue(0);
                if (saturation) saturation.setCurrentValue(0);
                break;
            case "vanillacookbook:warped_gummy":
                player.removeEffect('wither');
                break;
            case "vanillacookbook:pitcher_praline":
                player.removeEffect('mining_fatigue');
                break;
        }
    }
    eatTeleportFood(args) {
        const { itemStack, source: player } = args;
        const itemType = itemStack.typeId;

        if (itemType !== "vanillacookbook:chorus_juice" &&
            itemType !== "farmerscookbook:chorus_cake_slice") {
            return;
        }

        const dim = player.dimension;
        const startLoc = player.location;
        const range = 8;
        const maxAttempts = 1000;

        const isPassable = (block) => {
            if (!block) return false;
            if (block.isAir) return true;
            if (block.isLiquid) return false;

            const id = block.typeId;
            const passables = [
                "sapling", "mushroom", "plant", "vine", "fern", "deadbush",
                "torch", "lantern", "carpet", "snow_layer",
                "button", "lever", "tripwire", "rail", "redstone"
            ];

            if (id.includes("grass")) return !id.includes("_block") && !id.includes("_path");
            if (id.includes("flower") || id.includes("rose") || id.includes("tulip") || id.includes("orchid")) {
                return !id.includes("chorus") && !id.includes("pot");
            }

            return passables.some(keyword => id.includes(keyword));
        };

        const hasSupport = (block) => {
            if (!block) return false;
            if (isPassable(block) || block.isAir || block.isLiquid) return false;
            const id = block.typeId;
            return !(id.includes("lava") || id.includes("fire") || id.includes("magma"));
        };

        const isFenceLike = (block) => {
            const id = block.typeId;
            return (id.includes("wall") || id.includes("fence") || id.includes("gate")) &&
                !id.includes("sign") && !id.includes("banner");
        };

        const spawnParticleBurst = (center) => {
            for (let j = 0; j < 64; j++) {
                dim.spawnParticle("minecraft:basic_portal_particle", {
                    x: center.x + (Math.random() * 0.8 - 0.4),
                    y: center.y + (Math.random() * 1.8),
                    z: center.z + (Math.random() * 0.8 - 0.4)
                });
            }
        };

        const startX = Math.floor(startLoc.x);
        const startY = Math.floor(startLoc.y);
        const startZ = Math.floor(startLoc.z);

        for (let i = 0; i < maxAttempts; i++) {
            const dx = Math.floor(Math.random() * (range * 2 + 1)) - range;
            const dy = Math.floor(Math.random() * (range * 2 + 1)) - range;
            const dz = Math.floor(Math.random() * (range * 2 + 1)) - range;

            const targetX = startX + dx;
            const targetY = startY + dy;
            const targetZ = startZ + dz;

            if (targetY < -64 || targetY > 320) continue;

            const blockBelow = dim.getBlock({ x: targetX, y: targetY - 1, z: targetZ });
            const blockFeet = dim.getBlock({ x: targetX, y: targetY, z: targetZ });
            const blockHead = dim.getBlock({ x: targetX, y: targetY + 1, z: targetZ });

            if (!blockBelow || !blockFeet || !blockHead) continue;

            if (!hasSupport(blockBelow)) continue;
            if (!isPassable(blockFeet)) continue;
            if (!isPassable(blockHead)) continue;

            let finalY = targetY;
            if (isFenceLike(blockBelow)) {
                finalY += 0.5;
            } else {
                finalY += 0.06;
            }

            const targetLoc = { x: targetX + 0.5, y: finalY, z: targetZ + 0.5 };

            dim.playSound("mob.endermen.portal", startLoc, { volume: 1, pitch: 1 });
            spawnParticleBurst(startLoc);

            player.teleport(targetLoc, { checkForBlocks: false, keepVelocity: false });

            dim.playSound("mob.endermen.portal", targetLoc, { volume: 1, pitch: 1 });
            spawnParticleBurst(targetLoc);

            break;
        }
    }
}

__decorate([
    methodEventSub(world.afterEvents.itemStopUse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Food.prototype, "eat", null);

__decorate([
    methodEventSub(world.afterEvents.itemCompleteUse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Food.prototype, "eatTeleportFood", null);