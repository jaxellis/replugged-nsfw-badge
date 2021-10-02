const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

module.exports = class NSFWBadge extends Plugin {
	async startPlugin() {
		const iconClasses = await getModule(['iconItem']);
		const badgeClasses = await getModule(['textBadge']);
		const channelItem = await getModule((m) => m.default && m.default.displayName === 'ChannelItem');

		inject('nsfw-badge', channelItem, 'default', (args) => {
			if (args[0]['channel']['nsfw'] === false) {return args;}
			args[0].children.push(
				React.createElement('div', {
					className: 'nsfw-badge ' + iconClasses.iconBase,
					children: React.createElement('div', {
						className:
							badgeClasses.textBadge + ' ' + badgeClasses.baseShapeRound,
						style: {
							borderRadius: '3px',
							backgroundColor: 'rgb(240, 71, 71)',
						},
					}, 'NSFW'),
				})
			);
			return args;
		}, true);
	}

	pluginWillUnload() {
		uninject('nsfw-badge');
	}
};
