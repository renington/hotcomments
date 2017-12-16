import React from 'react'
import App from './App'

import { shallow, mount, render } from 'enzyme'

describe('<App />', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.length).toBe(1)
    })

    it('should have .container class', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.is('.container')).toBe(true)
    })

    it('shows Comments', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find('Comments').length).toBe(1)
    })

    it('shows NewComment', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find('NewComment').length).toBe(1)
    })

    it('adds a new comment to state when postNewComment is called', () => {
        const wrapper = mount(<App />)
        wrapper.instance().postNewComment({ comment: 'test' })
        const comments = Object.keys(wrapper.instance().state.comment)
        expect(comments.length).toBe(1)
    })

    // it('outputs the <App />', () => {
    //     const wrapperShallow = shallow(<App />)
    //     const wrapperMount = mount(<App />)
    //     const wrapperRender = render(<App />)

    //     console.log(wrapperShallow.debug())
    //     console.log(wrapperMount.debug())
    //     console.log(wrapperRender.html())
    // })
})