import {QuestionLogoDefaultProps} from "./interface";
import Component from "./Component";
import PropComponent from "./PropsComponent";

export * from './interface';


export default {
    title: "Logo",
    type: 'logo',
    Component,
    PropComponent,
    defaultProps: QuestionLogoDefaultProps
}