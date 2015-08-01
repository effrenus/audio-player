const componentName = 'file-manager';

const bem = {
	manager: {
		name: componentName
	},
	droparea: {
		name: `${componentName}__droparea`,
		states: ['active']
	},
	text: {
		name: `${componentName}__text`
	},
	file: {
		name: `${componentName}__file`
	}
};

export default bem;
