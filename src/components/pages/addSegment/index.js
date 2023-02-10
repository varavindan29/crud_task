import { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import './addSegmemt.scss'

const AddSegmentForm = (props) => {
    let {
        saveData = () => { },
        toggle = () => { }
    } = props;
    const simpleValidator = useRef(new SimpleReactValidator({ className: "text-danger", }));
    const [, forceUpdate] = useState();
    const [segmentFormObj, setSegmentFormObj] = useState({
        segment_name: "",
        schema: [{}]
    });
    const [schemaTempData, setSchemaTempData] = useState([])

    const schemaToSegment = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' }
    ];


    const handleAddNewSchema = () => {
        segmentFormObj?.schema.push({...schemaToSegment[0]});
        setSegmentFormObj({ ...segmentFormObj })
    };

    const handleRemoveSchema = (index) => {
        if (index !== -1 && segmentFormObj?.schema.length > 1) {
            segmentFormObj?.schema.splice(index, 1);
            setSegmentFormObj({ ...segmentFormObj })
        }
    };


    const handleSaveData = () => {
        const formValid = simpleValidator.current.allValid();
        if (formValid) {
            saveData({ ...segmentFormObj });
            setSegmentFormObj({
                segment_name: "",
                schema: [{}]
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        }
    };

    const handleCancelData = () => {
        toggle()
    };

    const handleInputChange = (event, i) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === 'schema') {
            const res = schemaToSegment?.find((data) => data.value === value);
            if (res) {
                segmentFormObj.schema[i] = res;
                console.log('[...schemaTempData, res]------------?', [...schemaTempData, res.value])
                setSchemaTempData([...schemaTempData, res.value])
                setSegmentFormObj({ ...segmentFormObj })
            }
            console.log()

        } else {
            setSegmentFormObj({
                ...segmentFormObj,
                [name]: value
            })
        }


    }

    return (
        <div className="add-from-page">
            <div className='row'>
                <div className='col-md-12 mb-3'>
                    <label for="exampleFormControlInput1" class="form-label">Enter the Name of the Segment</label>
                    <input type="email" class="form-control" value={segmentFormObj.segment_name} name='segment_name' onChange={handleInputChange} placeholder="Name of the Segment" />
                    {simpleValidator.current.message("Segment", segmentFormObj?.segment_name, "required")}
                </div>

                <div className='col-md-12 mb-3'>
                    <p>To Save your segment. you need to add the schemas to build the query</p>
                </div>
                <div className='col-md-12 text-end mb-2'>
                    <label className='me-3'><label class="custom-badge rounded-circle  text-bg-success"></label> - User Traits</label>
                    <label><label class="custom-badge rounded-circle  text-bg-danger"></label> - Group Traits</label>

                </div>
                {segmentFormObj?.schema?.map((data, i) => <div className='col-md-12 mb-2'>
                    <div class="input-group">
                        <span class="input-group-text bg-transparent border-0 "><label class={`custom-badge rounded-circle  text-bg-${['account_name','city','state'].includes(segmentFormObj?.schema[i].value)?"danger":"success"}`}></label> </span>
                        <select class="form-select" aria-label="Default select example" value={schemaTempData[i]} name='schema' onChange={(e) => handleInputChange(e, i)}>
                            {schemaToSegment.map((data) => <option value={data.value}>{data.label}</option>)}
                        </select>
                        <span class={`input-group-text bg-transparent border-0 material-symbols-outlined  ${segmentFormObj?.schema.length > 1 && 'cursor-pointer'}`} onClick={() => handleRemoveSchema(i)}>remove</span>
                    </div>
                    {simpleValidator.current.message("Schema", schemaTempData[i], "required")}
                </div>)}

                <div className='col-md-12 mb-4'>
                    <a className='link-info  cursor-pointer' onClick={handleAddNewSchema}><span class="material-symbols-outlined">add</span>Add new schema</a>
                </div>
                <div className='col-md-12 mb-2'>
                    <button type="button" class="btn btn-info text-white me-2" onClick={handleSaveData}>Save the segment</button>
                    <button type="button" class="btn btn-outline-danger" onClick={handleCancelData}>Cancel</button>
                </div>
            </div>

        </div>
    )

};

export default AddSegmentForm;