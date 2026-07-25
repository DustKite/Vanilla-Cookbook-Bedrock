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
        const allowedItems = ["vanillacookbook:chorus_juice", "farmerscookbook:chorus_cake_slice", "vanillacookbook:chorus_roll", "vanillacookbook:ender_pie"];
        if (!allowedItems.includes(itemStack.typeId)) return;
        const dimension = player.dimension;
        const startLocation = { x: player.location.x, y: player.location.y, z: player.location.z };
        const isPassable = (block) => {
            if (!block || block.isAir) return true;
            const typeId = block.typeId;
            if (block.isLiquid || /water|lava|sea|kelp|coral/.test(typeId)) return false;
            return /sapling|mushroom|plant|vine|fern|bush|torch|lantern|carpet|snow|button|lever|rail|redstone|flower|rose|tulip|orchid|grass/.test(typeId) && !/_block|_path|pot|chorus/.test(typeId);
        };
        const spawnBodyFX = (loc) => {
            dimension.playSound("mob.endermen.portal", loc);
            for (let j = 0; j < 20; j++) {
                dimension.spawnParticle("minecraft:basic_portal_particle", {
                    x: loc.x + (Math.random() - 0.5),
                    y: loc.y + (Math.random() * 2),
                    z: loc.z + (Math.random() - 0.5)
                });
            }
        };
        const spawnTrail = (start, end) => {
            const dx = end.x - start.x, dy = end.y - start.y, dz = end.z - start.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const steps = Math.floor(distance * 3);
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const lx = start.x + dx * t;
                const ly = start.y + dy * t;
                const lz = start.z + dz * t;
                for (let k = 0; k < 2; k++) {
                    dimension.spawnParticle("minecraft:basic_portal_particle", {
                        x: lx + (Math.random() - 0.5) * 0.3,
                        y: ly + (Math.random() * 2),
                        z: lz + (Math.random() - 0.5) * 0.3
                    });
                }
            }
        };
        for (let i = 0; i < 512; i++) {
            const targetX = Math.floor(startLocation.x + Math.random() * 17 - 8);
            const targetY = Math.floor(startLocation.y + Math.random() * 17 - 8);
            const targetZ = Math.floor(startLocation.z + Math.random() * 17 - 8);
            if (targetY < -64 || targetY > 319) continue;
            const blockBelow = dimension.getBlock({ x: targetX, y: targetY - 1, z: targetZ });
            const blockFeet = dimension.getBlock({ x: targetX, y: targetY, z: targetZ });
            const blockHead = dimension.getBlock({ x: targetX, y: targetY + 1, z: targetZ });
            if (!blockBelow || !blockFeet || !blockHead) continue;
            const isWater = (b) => b.isLiquid || /water|sea|kelp|coral/.test(b.typeId);
            const isSolid = (b) => !b.isAir && !isPassable(b) && !isWater(b) && !/lava|fire|magma/.test(b.typeId);
            if (isSolid(blockBelow) && isPassable(blockFeet) && isPassable(blockHead) && !isWater(blockFeet)) {
                const offset = /(wall|fence|gate)/.test(blockBelow.typeId) ? 0.5 : 0.06;
                const targetLocation = { x: targetX + 0.5, y: targetY + offset, z: targetZ + 0.5 };
                spawnBodyFX(startLocation);
                spawnTrail(startLocation, targetLocation);
                player.teleport(targetLocation, { checkForBlocks: false, keepVelocity: false });
                spawnBodyFX(targetLocation);
                return;
            }
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