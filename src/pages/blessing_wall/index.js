import React, { useState }  from 'react';
import config from "./config.json";
import Layout from '@theme/Layout';
import Style from './index.module.scss'
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function(){
    let [curPage, setPage] = useState(0);
    const pageSize = 3;
    const isBrowser = useIsBrowser();

    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const totalDataSource = config?.[language];
    let dataSource = {...totalDataSource}
    dataSource.blessing = totalDataSource.blessing.slice(curPage * pageSize, curPage * pageSize + pageSize);
    let flag = totalDataSource.blessing.length % pageSize === 0;
    let totalPage = Math.floor(totalDataSource.blessing.length / pageSize)
    totalPage = flag ? totalPage : totalPage + 1;
    let sum = 0;
    totalPage = new Array(totalPage).fill(-1).map((curv) => {
            sum++;
            return curv + sum;
    })

    const changePage = (index) =>{
        setPage(index);
        dataSource.blessing = totalDataSource.blessing.slice(index * pageSize, index * pageSize + pageSize);
    }

    const nextPage = (type) =>{
        if(type === '<') {
            if(curPage <= 0) return;
            else changePage(curPage - 1);
                
        }

        if(type === '>') {
            if(curPage >= totalPage.length - 1) return;
            else changePage(curPage + 1);
        }
    }

    return (
        <Layout>
            <div className={Style.title}>{dataSource.info.title}</div>
           <div>
               {
                   dataSource.blessing.map(item => {
                       return (
                           <div className={Style.person_dialog} key={item.name}>
                               <div className={Style.avatar} style={{backgroundImage: `url(${item.avatar})`}}></div>
                               <div className={Style.dialog}>
                                   <div className={Style.dialogBar}>
                                       <div className={Style.tri}></div>
                                       <div className={Style.tri_small}></div>
                                       <div className={Style.user_info}>
                                           <span style={{fontSize: '15px', color: '#6F7574'}}>{item.name + ' '}</span>
                                           <span style={{fontSize: '10px', color: '#6F7574'}}>{item.company}</span>
                                           <span style={{fontSize: '10px', color: '#6F7573'}}> | </span>
                                           <span style={{fontSize: '10px', color: '#6F7573'}}>{item.post}</span>
                                       </div>
                                   </div>
                                   <div className={Style.user_blessing}>{item.utterance}</div>
                               </div>
                           </div>
                       )
                   })
               }
           </div>
           <div className={Style.big_page_box}>
            <div className={Style.page} onClick={()=> nextPage('<')}>{'<'}</div>
                {
                    totalPage.map((curv, index)=>{
                        return <div className={Style.page} onClick={()=>{changePage(curv)}} key={index}>{curv + 1}</div>
                    })
                }
            <div className={Style.page} onClick={()=> nextPage('>')}>{'>'}</div>
           </div>
         </Layout>
       );
}

/*class BlessingWall extends React.Component{

    constructor(){
        super();
        this.totalDataSource = config?.['en'];
        this.pageSize = 3;
        this.dataSource = {...this.totalDataSource}
        this.dataSource.blessing = this.totalDataSource.blessing.slice(0, this.pageSize);
        const flag = this.totalDataSource.blessing.length % this.pageSize === 0;
        this.totalPage = Math.floor(this.totalDataSource.blessing.length / this.pageSize)
        this.totalPage = flag ? this.totalPage : this.totalPage + 1;
        let sum = 0;
        this.totalPage = new Array(this.totalPage).fill(-1).map((curv) => {
            sum++;
            return curv + sum;
        })
        this.state = {curPage: 0}

    }

    changePage = (index) =>{
        this.setState({curPage: index});
        this.dataSource.blessing = this.totalDataSource.blessing.slice(index * this.pageSize, index * this.pageSize + this.pageSize);
    }

    NextPage = (type) =>{
        if(type === '<') {
            if(this.state.curPage <= 0) return;
            else this.changePage(this.state.curPage - 1);
                
        }

        if(type === '>') {
            if(this.state.curPage >= this.totalPage.length - 1) return;
            else this.changePage(this.state.curPage + 1);
        }
    }


    render(){
        const language = location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
        this.totalDataSource = config?.[language];
        this.dataSource = {...this.totalDataSource}
        this.dataSource.blessing = this.totalDataSource.blessing.slice(this.state.curPage * this.pageSize, this.state.curPage * this.pageSize + this.pageSize);

        return (
            <Layout>
                <div className={Style.title}>Linkis 寄语墙</div>
               <div>
                   {
                       this.dataSource.blessing.map(item => {
                           return (
                               <div className={Style.person_dialog} key={item.name}>
                                   <div className={Style.avatar} style={{backgroundImage: `url(${item.avatar})`}}></div>
                                   <div className={Style.dialog}>
                                       <div className={Style.dialogBar}>
                                           <div className={Style.tri}></div>
                                           <div className={Style.tri_small}></div>
                                           <div className={Style.user_info}>
                                               <span style={{fontSize: '15px', color: '#6F7574'}}>{item.name + ' '}</span>
                                               <span style={{fontSize: '10px', color: '#6F7574'}}>{item.company}</span>
                                               <span style={{fontSize: '10px', color: '#6F7573'}}> | </span>
                                               <span style={{fontSize: '10px', color: '#6F7573'}}>{item.post}</span>
                                           </div>
                                       </div>
                                       <div className={Style.user_blessing}>{item.utterance}</div>
                                   </div>
                               </div>
                           )
                       })
                   }
               </div>
               <div className={Style.big_page_box}>
                <div className={Style.page} onClick={()=> this.NextPage('<')}>{'<'}</div>
                    {
                        this.totalPage.map((curv, index)=>{
                            return <div className={Style.page} onClick={()=>{this.changePage(curv)}} key={index}>{curv + 1}</div>
                        })
                    }
                <div className={Style.page} onClick={()=> this.NextPage('>')}>{'>'}</div>
               </div>
             </Layout>
           );
    }
}*/