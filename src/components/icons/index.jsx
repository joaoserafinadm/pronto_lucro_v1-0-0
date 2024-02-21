import { AiOutlineLeft } from "@react-icons/all-files/ai/AiOutlineLeft";
import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";




export default function Icons(props) {

    switch (props.icon) {
        case 'a-l':
            return <AiOutlineLeft className="me-2" />
            break;
        case 'a-r':
            return <AiOutlineRight className="me-2" />
            break;
        default:
    }

}