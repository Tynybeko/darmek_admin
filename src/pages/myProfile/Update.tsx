// import  { ChangeEvent, FormEvent, useState } from 'react'
// import { IUser, SetState } from '../../types'
// import Modal from '../../components/UI/Modal'
// import Input from '../../components/UI/Input'
// import Button, { CloseButton } from '../../components/UI/Button'
// import Select from '../../components/UI/Select'
// import API from '../../axios'
// import NotImage from '../../components/NotImage'


// interface IUpdateUser {
//     element: IUser,
//     setClose: SetState<IUser | null>,
//     setData: SetState<IUser>
// }

// export default function Update({ element, setClose, setData }: IUpdateUser) {
//     const [inData, setInData] = useState({ ...element, phone: '+996' + element.phone.slice(1).split(' ').join('') })
//     const [images, setImages] = useState<any>()
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         let key = e.target.name
//         let value = e.target.value
//         setInData(prev => ({ ...prev, [key]: value }))
//     }
//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         let { image, ...someData } = inData
//         const response = API.put(`/users/${element.id}/`, images ? { ...someData, image: images } : someData, { headers: { "Content-Type": 'application/json' } })
//         response
//             .then(res => {
//                 setData(res.data)
//                 console.log(res.data);

//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
//     return (
//         <Modal>
//             <div className='single'>
//                 <form onSubmit={handleSubmit} className='update'>
//                     <div className="head">
//                         <h2>Изменить</h2>
//                         <nav>
//                             <Button type='submit'>
//                                 Сохранить
//                             </Button>
//                             <CloseButton type='button' onClick={() => setClose(null)} />
//                         </nav>
//                     </div>
//                     <div className='body form grid' >
//                         <div>
//                             <h3>Телефон:</h3>
//                             <Input type='text' onChange={handleChange} placeholder='+996550000000' value={inData.phone} required name='phone' />
//                         </div>
//                         <div>
//                             <h3>ФИО:</h3>
//                             <Input type='text' onChange={handleChange} placeholder='Иван' value={inData.full_name ?? ''} required name='full_name' />
//                         </div>

//                         <div>
//                             <h3>Пол:</h3>
//                             <label className='select' htmlFor="">
//                                 <Select defaultValue={inData.gender ? {
//                                     id: 1,
//                                     title: 'Мужчина',
//                                     value: inData.gender
//                                 } : {
//                                     id: 0,
//                                     title: 'Выберите',
//                                     value: ''
//                                 }} selectData={[
//                                     {
//                                         id: 1,
//                                         title: 'Мужчина',
//                                         value: 'M'
//                                     },
//                                     {
//                                         id: 2,
//                                         title: 'Женщина',
//                                         value: 'F'
//                                     }
//                                 ]} />
//                             </label>
//                             <input style={{ height: 0, visibility: 'hidden' }} type="text" />
//                         </div>
//                         <div>
//                             <h3>Город:</h3>
//                             <Input type='text' onChange={handleChange} placeholder='Ош' value={inData.city ?? ''} name='city' />
//                         </div>
//                         <div>
//                             <h3>Email:</h3>
//                             <Input type='email' onChange={handleChange} placeholder='ivan@gmail.com' value={inData.email ?? ''} name='email' />
//                         </div>
//                         <div>
//                             <h3>Семейное положение:</h3>
//                             <Input type='text' onChange={handleChange} placeholder='Ош' value={inData.marital_status ?? ''} name='marital_status' />
//                         </div>
//                         <div>
//                             <h3>Дата рождение:</h3>
//                             <Input type='date' onChange={handleChange} value={inData.date_of_birth ?? ''} name='date_of_birth' />
//                         </div>
//                     </div>
//                     <div className="body body_content">
//                         <label className={`image-adder img`} htmlFor="image">
//                             <input name='img' id='image' style={{ display: 'none' }} onChange={(e) => {
//                                 if (e.target.files) {
//                                     setImages(e.target.files[0] as any)
//                                 }
//                             }} accept='image/*' type="file" />
//                             {
//                                 images ? <img src={URL.createObjectURL(images)} alt="New News Img" /> : inData.image ? <img src={inData.image} alt="IMG" /> : <NotImage />
//                             }

//                         </label>
//                     </div>
//                 </form>
//             </div>
//         </Modal>
//     )
// }
