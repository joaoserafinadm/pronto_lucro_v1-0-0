import { AiOutlineLeft } from "@react-icons/all-files/ai/AiOutlineLeft";
import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";
import { AiOutlineUp } from "@react-icons/all-files/ai/AiOutlineUp";
import { AiOutlineDown } from "@react-icons/all-files/ai/AiOutlineDown";




export default function Icons(props) {

    switch (props.icon) {
        case 'a-l':
            return <AiOutlineLeft className={props.className} />
            break;
        case 'a-r':
            return <AiOutlineRight className={props.className} />
            break;
        case 'a-u':
            return <AiOutlineUp className={props.className} />
            break;
        case 'a-d':
            return <AiOutlineDown className={props.className} />
            break;
        default:
    }

}