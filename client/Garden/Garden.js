import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import auth from '../auth/auth-helper';
import { listPlants } from '../plant/api-plant';
import { create, listGardenSchema } from './api-garden';
import MyGarden from './MyGarden';
import NewGarden from './NewGarden';
import PlanGarden from './PlanGarden';

export default function Garden() {
    const history = useHistory()
    const jwt = auth.isAuthenticated()
    const [plants, setPlants] = useState([])
    const [gardens, setGardens] = useState([])
    const [values, setValues] = useState({
        image: '',
        season: 'Spring',
        year: 2021,
        error: false,
        gardenId: '',
        showing: false,
        showNew: false
    })
    const [open, setOpen] = useState(false)

    const getPlants = () => {
        plants.map(k => k.map(j => {
            let data = {
                id: j._id,
                content: j
            }
            return data
        })
        )
    }

    useEffect(() => {
        const jwt = auth.isAuthenticated()
        const abortController = new AbortController()
        const signal = abortController.signal
        listPlants({
            userId: jwt.user._id,
        }, { t: jwt.token }, signal).then((data) => {
            if (data.error)
                console.log(data.error)
            else {
                data.plants.map(plant => plant.image = '')
                setPlants([data.plants])
            }
        })
        listGardenSchema({
            userId: jwt.user._id,
        }, { t: jwt.token }, signal).then((data) => {
            if (data.error)
                console.log(data.error)
            else {
                setGardens(data)
            }
        })
        // getPlants(1)
        return function cleanup() {
            abortController.abort()
        }

    }, [])




    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };
    function onDragEnd(result) {
        const { source, destination } = result;

        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(plants[sInd], source.index, destination.index);
            const newPlants = [...plants];
            newPlants[sInd] = items;
            setPlants(newPlants);
        } else {
            const result = move(plants[sInd], plants[dInd], source, destination);
            const newPlants = [...plants];
            newPlants[sInd] = result[sInd];
            newPlants[dInd] = result[dInd];

            setPlants(newPlants.filter(group => group.length));
        }
    }

    const handleSetPlants = (plants) => {
        setPlants(plants)
    }

    //...............New garden

    const clickSubmit = () => {

        let gardenData = new FormData()
        plants && gardenData.append('gardenScheme', plants)
        values.season && gardenData.append('season', values.season)
        values.image && gardenData.append('image', values.image)
        create({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, gardenData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                // setOpen(false)
                setValues({ ...values, gardenId: data._id })
            }
        })
    }


    const handleChange = name => event => {
        const value = name === 'image'
            ? event.target.files[1]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    const handleClickOpen = () => {
        setOpen(true)
        clickSubmit()
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleCreate = () => {
        setValues({ ...values, showNew: true, showing: false })
    }

    const handleShowGarden = () => {
        setValues({ ...values, showing: true, showNew: false })
    }

    //-----------------------

    const removeGarden = (garden) => {
        const updatedGardens = [...gardens]
        const index = updatedGardens.indexOf(garden)
        updatedGardens.splice(index, 1)
        setGardens(updatedGardens)
    }

    const addGarden = (garden) => {
        const updatedGardens = [...gardens]
        updatedGardens.unshift(garden)
        setGardens(updatedGardens)
    }


    return (
        <>
            <MyGarden handleShowGarden={handleShowGarden} handleCreate={handleCreate} handleCreate={handleCreate} onRemove={removeGarden} gardens={gardens} values={values} />
            {
                values.showNew &&
                <>
                    <NewGarden clickSubmit={clickSubmit} handleChange={handleChange} handleClickOpen={handleClickOpen} addGarden={addGarden} handleClose={handleClose} values={values} open={open} plants={plants} getPlants={getPlants} handleShowGarden={handleShowGarden} />
                    <PlanGarden plants={plants} onDragEnd={onDragEnd} getPlants={getPlants} handleSetPlants={handleSetPlants} handleCreate={handleCreate} />
                </>
            }
        </>
    )
}