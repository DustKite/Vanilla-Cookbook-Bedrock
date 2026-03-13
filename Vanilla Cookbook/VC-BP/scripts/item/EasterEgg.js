var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world, PlayerInteractWithBlockAfterEvent, GameMode } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";
import { ItemAPI } from "../lib/ItemAPI";
import { ItemUtil } from "../lib/ItemUtil";

export class EasterEgg {
    interact(event) {
        const { player, block, itemStack } = event;
        const blockTypeId = block.typeId;
        const selectedSlotIndex = player.selectedSlotIndex;
        const container = player.getComponent('inventory')?.container;
        if (blockTypeId !== "minecraft:dragon_egg" && blockTypeId !== "minecraft:air") {
            return;
        }
        if (!itemStack || itemStack.typeId !== "vanillacookbook:chocolate") {
            return;
        }
        ItemAPI.spawn(block, "vanillacookbook:chocolate_egg", 1);
        if (player?.getGameMode() === GameMode.Creative) {
            return;
        }
        ItemUtil.clearItem(container, selectedSlotIndex);
    }
}

__decorate([
    methodEventSub(world.afterEvents.playerInteractWithBlock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerInteractWithBlockAfterEvent]),
    __metadata("design:returntype", void 0)
], EasterEgg.prototype, "interact", null);