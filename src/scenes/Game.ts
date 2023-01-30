import Phaser from 'phaser'

import { createCharacterAnims } from '../anims/CharacterAnims'

import '../characters/Faune'
import Faune from '../characters/Faune'

export default class Game extends Phaser.Scene
{
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private faune!: Faune

	constructor()
	{
		super('game')
	}

	preload()
    {
		this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
		createCharacterAnims(this.anims)
		this.faune = this.add.faune(128, 128, 'faune')
	}
	
	update(t: number, dt: number)
	{
		if (this.faune)
		{
			this.faune.update(this.cursors)
		}
	}
}
