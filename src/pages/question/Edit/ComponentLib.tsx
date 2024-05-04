import {FC, useCallback, useId} from "react";
import {componentConfList, ComponentConfType} from "../../../components/QuestionComponents";
import styles from './ComponentLib.module.scss';
import {useDispatch} from "react-redux";
import {nanoid} from 'nanoid'
import {addComponent} from "../../../store/componentReducer";


const Lib: FC = () => {
    const dispatch = useDispatch();
    const genComponent = useCallback(
        (c: ComponentConfType) => {
            const {Component, title, type, defaultProps} = c;
            const feId = nanoid();
            function handleClick() {
                dispatch(addComponent({
                    fe_id: nanoid(),
                    ...(title && {title}),
                    type: type,
                    props: defaultProps
                }));
            }

            return (
                <div key={feId} className={styles.wrapper} onClick={handleClick}>
                    <div className={styles.component}>
                        <Component/>
                    </div>
                </div>
            )
        }, []);

    return <div>
        {componentConfList.map(c => genComponent(c))}
    </div>
}

export default Lib;