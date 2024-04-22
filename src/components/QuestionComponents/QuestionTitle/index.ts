import {QuestionTitleDefaultProps} from "./interface";
import Component from "./Component";
import PropComponent from "./PropsComponent";

export * from './interface';


export default {
    title: 'title',
    type: 'questionTitle',
    Component,
    PropComponent,
    defaultProps: QuestionTitleDefaultProps
}