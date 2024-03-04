import {FC} from "react";
import styles from './index.module.scss';
import EditCanvas from "../../../pages/question/Edit/EditCanvas";
import {useDispatch} from "react-redux";
import {changeSelectedId} from "../../../store/componentReducer";
import LeftPanel from "../Edit/LeftPanel";
import EditHeader from "../../../pages/question/Edit/EditHeader";
import RightPanel from "../Edit/RightPanel";

const Edit: FC = () => {

    const dispatch = useDispatch();
    function clearSelected() {
        dispatch(changeSelectedId(''))
    }
    return (
        <div className={styles.container}>
            <EditHeader />
            <div className={styles['content-wrapper']}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel />
                    </div>
                    <div className={styles.main} onClick={clearSelected}>
                        <div className={styles['canvas-wrapper']}>
                            <EditCanvas />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <RightPanel />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit;