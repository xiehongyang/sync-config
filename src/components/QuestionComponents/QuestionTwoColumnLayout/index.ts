import { QuestionTwoColumnDefaultProps} from "./interface";
import Component from "./Component";
import PropComponent from "./PropsComponent";


export * from './interface';


export default {
    title: '2 Column Layout',
    type: 'twoColumn',
    Component,
    PropComponent,
    defaultProps: QuestionTwoColumnDefaultProps
}