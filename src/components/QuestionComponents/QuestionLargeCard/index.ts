import {QuestionLargeCardDefaultProps} from "./interface";
import Component from "./Component";
import PropComponent from "./PropsComponent";


export * from './interface';


export default {
    title: 'Large Card',
    type: 'largeCard',
    Component,
    PropComponent,
    defaultProps: QuestionLargeCardDefaultProps
}