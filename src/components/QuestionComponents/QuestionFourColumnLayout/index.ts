import { QuestionFourColumnDefaultProps} from "./interface";
import Component from "./Component";
import PropComponent from "./PropsComponent";


export * from './interface';


export default {
    title: '4 Column Layout',
    type: 'fourColumn',
    Component,
    PropComponent,
    defaultProps: QuestionFourColumnDefaultProps
}