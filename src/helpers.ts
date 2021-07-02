const clsfy = (...classes: any[]) => {
	return classes.map(classs => {
		if (typeof classs === 'string') return classs
		classs = Array.isArray(classs)
			? classs.map(cls => clsfy(cls))
			: Object.keys(classs).filter(key => classs[key])
		return classs.join(' ').trim()
	}).join(' ').trim()
}

export { clsfy }