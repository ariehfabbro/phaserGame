import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

	preload()
	{
		this.load.atlas('faune', 'character/fauna.png', 'character/fauna.json')
	}

	create()
	{
		this.scene.start('game')
	}
}