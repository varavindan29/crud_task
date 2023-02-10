import { useState } from 'react';
import { ModalPop } from '../../components'
import { AddSegmentForm } from '../../components/pages'
import { segmentExistData } from './data'

const HomePage = () => {
    const [segmentList, setSegmentList] = useState(segmentExistData)
    const [isModal, setIsModal] = useState(false);


    const handleGetObjectKeyName = (schema = []) => {
        if (schema.length > 0) {
            let obj = schema[0]
            for (const [key, value] of Object.entries(obj)) {
                return value;
            }
        } else {
            return ''
        }
    };

    const handleEditSegment = () => {
        setIsModal(!isModal)

    };

    const handleToggle = () => {
        setIsModal(false)
    };

    const handelUpdateTable = (data) => {
        setSegmentList([...segmentList, data]);
        setIsModal(false)
    }

    return (
        <div className="container mt-5">
            <div className='row'>
                <div className='col-12'>
                    <button type="button" class="btn btn-outline-info" onClick={handleEditSegment}>Save segment</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Segment name</th>
                        <th scope="col">schema to segment</th>

                    </tr>
                </thead>
                <tbody>
                    {segmentList.map((data, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{data.segment_name}</td>
                            <td>{handleGetObjectKeyName(data?.schema)} {data.schema.length > 0 && '+'+(data.schema.length - 1)}</td>

                        </tr>
                    )}


                </tbody>
            </table>

            <ModalPop className="modal-right" show={isModal} toggle={handleToggle}>
                <AddSegmentForm saveData={handelUpdateTable} toggle={handleToggle} />
            </ModalPop>
        </div>

    )
};


export default HomePage;