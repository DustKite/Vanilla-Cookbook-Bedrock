var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world, ItemComponentTypes, PlayerBreakBlockAfterEvent, GameMode } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";
import { ItemUtil } from "../lib/ItemUtil";
function spawnLoot(path, dimension, location) {
    return dimension.runCommand(`loot spawn ${location.x} ${location.y} ${location.z} loot "${path}"`);
}
export class GoldApple {
    break(args) {
        const player = args.player;
        if (player?.getGameMode() == GameMode.Creative) {
            return;
        }
        const itemStack = args.itemStackAfterBreak;
        const block = args.block;
        const blockTypeId = args.brokenBlockPermutation.type.id;
        if (!itemStack || itemStack.typeId !== "minecraft:golden_hoe") {
            return;
        }
        const enchantable = itemStack.getComponent(ItemComponentTypes.Enchantable);
        const silkTouch = enchantable?.getEnchantment('silk_touch');
        if (silkTouch) {
            return;
        }
        const inventory = player?.getComponent("inventory");
        const container = inventory?.container;
        if (container) {
            ItemUtil.damageItem(container, player.selectedSlotIndex);
        }
        if (blockTypeId === "minecraft:oak_leaves" || blockTypeId === "minecraft:dark_oak_leaves") {
            let fortuneLevel = 0;
            if (enchantable) {
                const fortune = enchantable.getEnchantment("fortune");
                if (fortune) {
                    fortuneLevel = Math.min(fortune.level, 4);
                }
            }
            let lootTablePath = `blocks/leaves/fortune_${fortuneLevel}`;
            spawnLoot(lootTablePath, block.dimension, block.location);
        }
    }
}

__decorate([
    methodEventSub(world.afterEvents.playerBreakBlock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerBreakBlockAfterEvent]),
    __metadata("design:returntype", void 0)
], GoldApple.prototype, "break", null);