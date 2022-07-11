import React,{useState,useEffect} from 'react';
import { Table ,Button,Popconfirm} from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import {GET_ALL_PUBLISHER_SAGA, DELETE_PUBLISHER_SAGA} from "../../redux/constant/libraryManager/publisherConstants";
import {UPDATE_LOGIN} from '../../redux/constant/libraryManager/loginConstants';

import { FormOutlined, DeleteOutlined } from '@ant-design/icons'

import FormAddPublisher from '../Form/Publisher/FormAddPublisher';
import FormEditPublisher from '../Form/Publisher/FormEditPublisher';


export default function PublisherComponents() {
  const dispatch = useDispatch();

  if(localStorage.getItem('id_user')!==null){
    dispatch({ type: UPDATE_LOGIN, text: 'LOGOUT' });
    
  }
  const publisherList = useSelector(state => state.publisherReducers.publisherList);
  const [keyword, setKeyword] = useState('');
    
  function handleInputChange(e) {
      setKeyword(e.target.value)
      dispatch({ type: GET_ALL_PUBLISHER_SAGA,
        name:e.target.value })
  }
  const [state,setState]=useState({
    filteredInfo: null,
    sortedInfo: null,
  })
  useEffect(() => {
    dispatch({ type: 'SET_WIDTH', widthDrawer: '320' });

    dispatch({ type: GET_ALL_PUBLISHER_SAGA ,name:''})

}, [])
const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };


  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (item2, item1) => {
          return item2.id - item1.id;
      },
      sortDirections: ['descend'],

  },
    {
      title: 'Ten',
      dataIndex: 'Ten',
      key: 'Ten',
  
      filteredValue: filteredInfo.Ten || null,
      onFilter: (value, record) => record.Ten.includes(value),
      sorter: (a, b) => a.Ten.length - b.Ten.length,
      sortOrder: sortedInfo.columnKey === 'Ten' && sortedInfo.order,
      ellipsis: true,
    },

    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',

    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',

    },
    {
      title: 'DiaChi',
      dataIndex: 'DiaChi',
      key: 'DiaChi',

    },
    {
      title: 'NguoiDaiDien',
      dataIndex: 'NguoiDaiDien',
      key: 'NguoiDaiDien',

    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => {
        const ButtonGroups = Button.Group;
          return <div>
            <ButtonGroups >
            <button className="btn mr-2 btn-primary" onClick={() => {
                        const action = {
                            type: 'OPEN_FORM',
                            title:'Edit Publisher',
                            Component: <FormEditPublisher />,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        const actionEditPublisher = {
                            type: 'EDIT_PUBLISHER',
                            publisherEditModel: record
                        }
                        dispatch(actionEditPublisher);
                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this publisher?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_PUBLISHER_SAGA, id: record.id ,name:keyword})
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>
                </ButtonGroups>
            
           

          </div>
      },
  }
  ];

  return (
    <div className="wrapper" >
    <>

    <Button ghost type="primary" style={{marginBottom:'10px'}}
    onClick={() => {
                        const action = {
                            type: 'OPEN_FORM',
                            title:'Add Publisher',
                            Component: <FormAddPublisher />,
                        }
                        dispatch(action);
                      
                    }}>
            Thêm Publisher
          </Button>
      
          <form className="navbar-search-v1" style={{position:'absolute',right:'20px',top:'100px',width:'30%'}}>
    <input type="text" name="Search" style={{border:'1px solid black'}} value={keyword}
            onChange={handleInputChange}  placeholder="Search publisher by name..." />
   
    
  </form>
        <Table columns={columns} style={{marginRight:'20px'}} dataSource={publisherList} onChange={handleChange} pagination={{ defaultPageSize: 7, showSizeChanger: false, pageSizeOptions: ['10', '20', '30']}} />
      </>
    </div>
  )
}
