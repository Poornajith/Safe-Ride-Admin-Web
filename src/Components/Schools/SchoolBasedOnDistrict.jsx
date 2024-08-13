import {useState} from "react";
import '../../App.css'

export default function SchoolBasedOnDistrict({district}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const schools = Object.values(district).filter(item => typeof item !== 'string');


    return (
        <div>
            <div onClick={toggleExpand}>
                <h5 className={'bg-glass m-2 p-2 rounded'}>{district.districtId}</h5>
            </div>
            {isExpanded && (
                <ul>
                    {schools.map((school, index) => (
                        <li key={index}>
                            {school.name}
                            <ul>
                                <li>Lat : {school.lat}</li>
                                <li>Lng : {school.lng}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}