import { QuestionThreeColumnDefaultProps} from "./interface";
import Component from "./Component";
import PropComponent from "./PropsComponent";


export * from './interface';


export default {
    title: '3 Column Layout',
    type: 'threeColumn',
    Component,
    PropComponent,
    defaultProps: QuestionThreeColumnDefaultProps
}