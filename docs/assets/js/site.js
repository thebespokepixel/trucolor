!(function () {
	'use strict'
	function e(e, n, t) {
		e.classList.contains(t) ? (e.classList.remove(t), n.innerHTML = '▾') : (e.classList.add(t), n.innerHTML = '▸')
	}
	function n() {
		const n = this.parentNode.parentNode.parentNode.getElementsByClassName('toggle-target')[0]
		e(n, n, 'display-none')
	}
	function t() {
		const n = this.parentNode.getElementsByClassName('toggle-target')[0]
		const t = this.getElementsByClassName('icon')[0]
		e(n, t, 'display-none')
	}
	function s(e) {
		const n = document.getElementById(e)
		n && n.offsetHeight === 0 && n.parentNode.parentNode.classList.contains('display-none') && n.parentNode.parentNode.classList.remove('display-none')
	}
	function a() {
		s(this.hash.substring(1))
	}
	anchors.options.placement = 'left', anchors.add('h3').remove('.no-anchor')
	const o = document.getElementById('toc').getElementsByTagName('li')
	const i = document.getElementById('filter-input')
	i.addEventListener('keyup', e => {
		if (e.keyCode === 13)			{
			for (let n = 0; n < o.length; n++) {
				const t = o[n]
				if (!t.classList.contains('display-none')) {
					return location.replace(t.firstChild.href), e.preventDefault()
				}
			}}
		let s = function () {
			return !0
		}
		const a = i.value.toLowerCase()
		a.match(/^\s*$/) || (s = function (e) {
			return e.firstChild.innerHTML.toLowerCase().indexOf(a) !== -1
		})
		for (let r = 0; r < o.length; r++) {
			const l = o[r]
			const d = Array.from(l.getElementsByTagName('li'))
			s(l) || d.some(s) ? l.classList.remove('display-none') : l.classList.add('display-none')
		}
	})
	for (let r = document.getElementsByClassName('toggle-step-sibling'), l = 0; l < r.length; l++) {
		r[l].addEventListener('click', n)
	}
	for (let d = document.getElementsByClassName('toggle-sibling'), c = 0; c < d.length; c++) {
		d[c].addEventListener('click', t)
	}
	window.addEventListener('hashchange', () => {
		s(location.hash.substring(1))
	}), s(location.hash.substring(1))
	for (let g = document.getElementsByClassName('pre-open'), m = 0; m < g.length; m++) {
		g[m].addEventListener('mousedown', a, !1)
	}
})()

