import React from 'react';
import ContentList from '../component/ContentList'
import { Container } from 'native-base';


export default class CollectScreen extends React.PureComponent {

    render() {
        return (
            <Container>
                <ContentList
                    url={'lg/collect/list/index/json'}
                    index={0}
                />
            </Container>

        );
    }
}