import { Fragment, useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { MoorhenMoleculeSelect } from "../select/MoorhenMoleculeSelect";
import { MoorhenLigandList } from "../list/MoorhenLigandList"
import { moorhen } from "../../types/moorhen";
import { gemmi } from "../../types/gemmi";
import { useSelector } from 'react-redux';

interface Props extends moorhen.CollectedProps {
    dropdownId: number;
    accordionDropdownId: number;
    setAccordionDropdownId: React.Dispatch<React.SetStateAction<number>>;
    sideBarWidth: number;
    showSideBar: boolean;
}

export const MoorhenLigandValidation = (props: Props) => {
    const moleculeSelectRef = useRef<null | HTMLSelectElement>(null)
    const [selectedMolNo, setSelectedMolNo] = useState<null | number>(null)
    const [cachedGemmiStructure, setCachedGemmiStructure] = useState<null | gemmi.Structure>(null)
    const [cardList, setCardList] = useState<null | JSX.Element>(null)
    const molecules = useSelector((state: moorhen.State) => state.molecules)

    const handleModelChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMolNo(parseInt(evt.target.value))
    }

    useEffect(() => {
        if (moleculeSelectRef.current.value !== null) {
            const selectedMolecule = molecules.find(molecule => molecule.molNo === parseInt(moleculeSelectRef.current.value))
            if(selectedMolecule) {
                setCardList(
                    <MoorhenLigandList commandCentre={props.commandCentre} molecule={selectedMolecule} glRef={props.glRef}/>    
                )
            } else {
                setCardList(null)    
            }
        } else {
            setCardList(null)
        }
    }, [cachedGemmiStructure, selectedMolNo])
    
    useEffect(() => {
        if (molecules.length === 0) {
            setSelectedMolNo(null)
        } else if (selectedMolNo === null) {
            setSelectedMolNo(molecules[0].molNo)
        } else if (!molecules.map(molecule => molecule.molNo).includes(selectedMolNo)) {
            setSelectedMolNo(molecules[0].molNo)
        }

    }, [molecules.length])

    useEffect(() => {
        if (selectedMolNo !== null) {
            let selectedMoleculeIndex = molecules.findIndex(molecule => molecule.molNo === selectedMolNo);
            if (selectedMoleculeIndex !== -1 && molecules[selectedMoleculeIndex]){
                setCachedGemmiStructure(molecules[selectedMoleculeIndex].gemmiStructure)
            }
        }
    })

    return <Fragment>
                <Form style={{ padding:'0', margin: '0' }}>
                    <Form.Group>
                        <Row style={{ padding:'0', margin: '0' }}>
                            <Col>
                                <MoorhenMoleculeSelect width="" onChange={handleModelChange} molecules={molecules} ref={moleculeSelectRef}/>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
                <div style={{overflowY:'auto', overflowX: 'hidden', height:'100%', paddingTop:'0.5rem', paddingLeft:'0.25rem', paddingRight:'0.25rem'}} >
                    {cardList}
                </div>
            </Fragment>
}
