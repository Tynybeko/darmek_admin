// import { FormEvent, useMemo, useState } from 'react'
// import Modal from '../../../components/UI/Modal'
// import { SetState } from '../../../types'
// import Button, { CloseButton } from '../../../components/UI/Button'
// import Input, { TextArea } from '../../../components/UI/Input'
// import Select from '../../../components/UI/Select'
// import { SelectItem } from '../Medicaments'
// import { useSelector } from 'react-redux'
// import { IRootState } from '../../../redux/store'
// import API from '../../../axios'

// interface ICreateProcut {
//     setClose: SetState<boolean>,
// }

// interface IPharmacyData {
//     "uid": any,
//     "pharmacy": any,
//     "count": number,
//     "title": string
// }

// export default function CreateMedical({ setClose }: ICreateProcut) {
//     const { pharmacy, medicalCat } = useSelector((state: IRootState) => state)
//     const [error, setError] = useState({
//         pharmacy_count: ''
//     })
//     const [changedPhar, setChangePhar] = useState<SelectItem | null>(null)
//     const [pharmacyData, setPharmacyData] = useState<IPharmacyData[]>([])
//     const [photos, setPhotos] = useState<any>(null)
//     const selectCat = useMemo(() => {
//         let cat: SelectItem[] = []
//         let phar: SelectItem[] = []
//         let data =
//         {
//             id: 0,
//             title: 'Выберите',
//             value: ''
//         }
//         if (medicalCat.data) {
//             cat = medicalCat.data.results.map(el => ({ id: el.id, value: el.uid, title: el.title }))
//         }
//         if (pharmacy.data) {
//             phar = pharmacy.data.results.map(el => ({ id: el.id, value: el.uid, title: el.name }))
//         }
//         return {
//             phar: [data, ...phar],
//             cat: [data, ...cat]
//         }
//     }, [])

//     const handleAddPhar = () => {
//         if (!changedPhar?.value) return setError(prev => ({ ...prev, pharmacy_count: 'Выберите чтоб добавить!' }))
//         let check = pharmacyData.find(el => el.uid == changedPhar.value)
//         if (check) return setChangePhar(null)
//         let newPhar: IPharmacyData = { uid: changedPhar.value, pharmacy: changedPhar.value, count: 0, title: changedPhar.title }
//         setPharmacyData(prev => [newPhar, ...prev])
//         setChangePhar(null)
//     }

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         let formData = new FormData(e.target as HTMLFormElement)
//         let myObj = Object.fromEntries(formData.entries())
//         let data = {
//             ...myObj,
//             photos,
//             pharmacy_count: pharmacyData.map(item => {
//                 let { title, ...some } = item
//                 return some
//             }),
//             is_active: true
//         }
//         const response = API.get('')
//     }

//     return (
//         <Modal handleClose={() => setClose(false)}>
//             <form onSubmit={handleSubmit} className='single'>
//                 <div>
//                     <div className="head">
//                         <h2>Добавление препарата</h2>
//                         <nav>
//                             <Button>Добавить</Button>
//                             <CloseButton type='button' onClick={() => setClose(false)} />
//                         </nav>
//                     </div>
//                     <div className='body'>
//                         <div className="form grid">
//                             <div>
//                                 <h3>Название</h3>
//                                 <Input required placeholder='Название' name='name' type='text' />
//                             </div>
//                             <div>
//                                 <h3>Область применение</h3>
//                                 <Input name='use_for' placeholder='Облась применение' type='text' />
//                             </div>
//                             <div>
//                                 <h3>Цена</h3>
//                                 <Input name='price' placeholder='Цена' min={0} type='number' />
//                             </div>
//                             <div>
//                                 <h3>Категория</h3>
//                                 <Input style={{ display: 'none' }}>
//                                     <Select handleChange={setChangePhar} selectData={selectCat.cat} />
//                                 </Input>
//                             </div>


//                             <div>
//                                 <h3>Аптеки</h3>
//                                 <Input style={{ display: 'none' }}>
//                                     <Select handleChange={setChangePhar} selectData={selectCat.phar} />
//                                     <Button onClick={handleAddPhar} type='button'>+</Button>
//                                 </Input>
//                             </div>
//                         </div>

//                         <div className="form">
//                             <div className="body_container form">
//                                 {
//                                     pharmacyData.map(item => (
//                                         <div>
//                                             <h3>{item.title}</h3>
//                                             <Input min={0} value={item.count} onChange={(e) => setPharmacyData(prev => prev.map(el => el.uid == item.uid ? ({ ...el, count: +e.target.value }) : el))} type='number' placeholder='Количетсво' >
//                                                 <Button onClick={() => setPharmacyData(prev => prev.filter(el => el.uid != item.uid))} type='button'>-</Button>
//                                             </Input>
//                                         </div>
//                                     ))
//                                 }
//                             </div>

//                         </div>
//                         <div className="form body_content">
//                             <div>
//                                 <div>
//                                     <h3>Характеристики</h3>
//                                     <TextArea name='сharacteristics' placeholder='Характеристики' type='text' />
//                                 </div>
//                                 <div>
//                                     <h3>Описание</h3>
//                                     <TextArea name='descrip' placeholder='Описание' />
//                                 </div>
//                                 <h3>Добавить изоброжение</h3>
//                                 <Input onChange={(e) => setPhotos((prev: any) => !prev ? e.target.files : [...prev, ...Array.from(e.target.files as any)])} id='file' style={{ display: 'none' }} multiple accept='image/*' placeholder='' type='file' >
//                                     <Button type='button' style={{ width: '100%' }} onClick={() => document.getElementById('file')?.click()}>Выбрать</Button>
//                                 </Input>
//                             </div>
//                             <div>
//                                 <div className='mini_img sel-no'>
//                                     {
//                                         photos ? Array.from(photos).map(item => (
//                                             <div onClick={() => setPhotos((prev: any) => {
//                                                 let list: any[] = [];
//                                                 let pho: any = item
//                                                 if (prev) {
//                                                     for (let el of prev) {
//                                                         if (el.name != pho?.name) {
//                                                             list.push(el)
//                                                         }
//                                                     }
//                                                 }
//                                                 return list
//                                             })} className='img'>
//                                                 <img src={URL.createObjectURL(item as File)} alt="" />

//                                             </div>
//                                         ))
//                                             : null
//                                     }
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </form>
//         </Modal>
//     )
// }
