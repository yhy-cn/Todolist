import React, { Component } from 'react'
import { Input, List, Image, Button, ListContent, Modal, Container, Header } from 'semantic-ui-react'

export default class todolist extends Component {
    state = {
        addValue: '',
        wordList: [
            { name: '投简历', state: 'done', id: 0 },
            { name: '去面试', state: 'undone', id: 1 },
            { name: '上班', state: 'undone', id: 2 },
        ],
        state: 'all'
    }
    componentDidMount() {
        // console.log()
        const wordList = JSON.parse(localStorage.getItem('wordList'))
        if (wordList) {
            this.setState({ wordList })
        }
    }
    //保存到本地存储
    save = () => {
        localStorage.setItem('wordList', JSON.stringify(this.state.wordList))
    }

    //点击添加按钮执行的函数
    add = () => {
        const { addValue, wordList } = this.state
        let newlist = wordList
        newlist.push({ name: addValue, state: 'undone', id: wordList.length })
        this.setState({ wordList: newlist })
        this.save()
    }
    //输入框的change事件，更新addvalue
    changeValue = (e) => {
        this.setState({ addValue: e.target.value })
    }
    //删除所选数据
    del = (index) => {
        const { addValue, wordList } = this.state
        wordList.splice(index, 1)
        this.setState(wordList)
        this.save()
    }
    //改变状态切换完成未完成
    changeState = (index) => {
        const { addValue, wordList } = this.state
        wordList[index].state == 'done' ? wordList[index].state = 'undone' : wordList[index].state = 'done'
        this.setState({ wordList })
        this.save()
    }
    //事件委托
    click = (e) => {
        let list = JSON.parse(localStorage.getItem('wordList'))
        switch (e.target.value) {
            case 'all': this.setState({ state: 'all', wordList: list }); break;
            case 'done': this.setState({ state: 'done', wordList: list.filter(i => i.state == 'done') }); break;
            default: this.setState({ state: 'undone', wordList: list.filter(i => i.state != 'done') });
        }
    }
    //双击事件
    doubleClick = () => {
        console.log(200000)
    }
    //修改
    update = (index) => {
        console.log(index)
    }
    //动态改名字
    changename = (e, index) => {
        const { wordList } = this.state
        wordList[index].name = e.target.value
        this.setState({ wordList })
        this.save()
    }
   
    render() {
        const { addValue, wordList, state } = this.state
        return (
            <div>
                <Container text style={{ display: 'flex', flexDirection: 'column', width: '500px' }} >
                    <Header style={{ textAlign: 'center' }} as='h1'>ToDoList</Header>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Input size="mini" value={addValue} onChange={this.changeValue} placeholder='add' /><Button onClick={() => this.add()}>add</Button>
                    </div>

                    <List animated verticalAlign='middle'>
                        {
                            wordList.map((i, index) => <List.Item key={i.id}>
                                <List.Content floated='right'>
                                    <Button size='mini' onClick={() => this.del(index)}>deltel</Button>
                                    <Modal
                                        trigger={<Button size='mini'>update</Button>}
                                    >
                                        <Input onChange={(e) => this.changename(e, index)} value={i.name} />
                                    </Modal>
                                </List.Content>
                                <List.Content>
                                    <List.Header onDoubleClick={() => this.doubleClick()} onClick={() => this.changeState(index)} style={i.state == 'done' ? { color: 'red', textDecoration: 'line-through',cursor:'pointer' } : {cursor:'pointer'}}>{i.name}</List.Header>
                                </List.Content>
                            </List.Item>)
                        }
                    </List>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} onClick={this.click}>
                        <Button value='all' color={state == 'all' ? 'red' : 'green'} size='tiny'>All</Button>
                        <Button value='done' color={state == 'done' ? 'red' : 'green'} size='tiny'>Done</Button>
                        <Button value='undone' color={state == 'undone' ? 'red' : 'green'} size='tiny'>UnDone</Button>
                    </div>
                </Container>


            </div>
        )
    }
}
