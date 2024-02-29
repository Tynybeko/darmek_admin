import { IHistoryPay, SetState } from '../types'
import Modal from './UI/Modal'
import  { CloseButton } from './UI/Button';
import Table, { EmptyTR, TBody, THead, TR } from './UI/Table';
import useDateFormat from '../hooks/useDateFormat';

interface IHistoryPayProps {
    hisData: IHistoryPay[],
    setClose: SetState<boolean>
}

export default function HistoryPay({ hisData, setClose }: IHistoryPayProps) {
    console.log(hisData);

    return (
        <Modal handleClose={() => setClose(false)}>
            <div className='single'>
                <div>
                    <div className="head">
                        <h2>История</h2>
                        <CloseButton onClick={() => setClose(prev => !prev)} />
                    </div>
                    <div className=''>
                        <Table>
                            <THead>
                                <tr>
                                    <th>Тип транзакции</th>
                                    <th>Время</th>
                                    <th>Сумма (заказа)</th>
                                    <th>Аптека</th>
                                </tr>
                            </THead>
                            <TBody>
                                {hisData.map(item => (
                                    <TR key={item.id}>
                                        <th>
                                            {item.method}
                                        </th>
                                        <th>
                                            {item?.order?.ordered_date ? useDateFormat(item?.order?.ordered_date) : 'Неизвезстно'}
                                        </th>
                                        <th>
                                            {item?.order?.total ?? 'Неизвестно'}
                                        </th>
                                        <th>
                                            {item?.order?.pharmacy_adress.name ?? 'Неизвестно'}
                                        </th>
                                    </TR>
                                ))}
                                {
                                    !hisData.length && <EmptyTR />
                                }

                            </TBody>

                        </Table>
                    </div>

                </div>
            </div>


        </Modal>
    )
}
