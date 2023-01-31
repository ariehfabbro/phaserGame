import Phaser from "phaser";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      faune(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Faune;
    }
  }
}

export default class Faune extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.anims.play("faune-idle-down");
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (!cursors) {
      return;
    }

    const speed = 100;

    const leftDown = cursors.left?.isDown;
    const rightDown = cursors.right?.isDown;
    const upDown = cursors.up?.isDown;
    const downDown = cursors.down?.isDown;

    if (leftDown) {
      this.anims.play("faune-run-side", true);
      this.setVelocity(-speed, 0);

      this.scaleX = -1;
      this.body.offset.x = 24;
    } else if (rightDown) {
      this.anims.play("faune-run-side", true);
      this.setVelocity(speed, 0);

      this.scaleX = 1;
      this.body.offset.x = 8;
    } else if (upDown) {
      this.anims.play("faune-run-up", true);
      this.setVelocity(0, -speed);
    } else if (downDown) {
      this.anims.play("faune-run-down", true);
      this.setVelocity(0, speed);
    } else {
      const parts = this.anims.currentAnim.key.split("-");
      parts[1] = "idle";
      this.anims.play(parts.join("-"));
      this.setVelocity(0, 0);
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "faune",
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    const sprite = new Faune(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.8);

    return sprite;
  }
);
