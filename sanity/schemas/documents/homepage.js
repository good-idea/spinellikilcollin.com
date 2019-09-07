export const homepage = {
	title: 'Homepage',
	type: 'document',
	name: 'homepage',
	fields: [
		{
			name: 'contentSections',
			label: 'Content Blocks',
			type: 'array',
			of: [{ type: 'hero' }, { type: 'carousel' }, { type: 'contentBlock' }],
		},
	],
	preview: {
		select: {},
		prepare: () => ({
			title: 'Homepage',
		}),
	},
}
