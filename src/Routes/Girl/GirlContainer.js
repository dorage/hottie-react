import React from 'react';
import GirlPresenter from './GirlPresenter';
import { serverApi } from '../../api';

export default class extends React.Component {
    state = {
        id: '',
        results: null,
        loading: true,
        error: false
    };

    handleScroll = async () => {
        // 스크롤 끝인식
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        ) {
            console.log('scroll!');
            return;
        }

        const {
            match: {
                params: { id }
            }
        } = this.props;
        try {
            const {
                data: { results }
            } = await serverApi.girlDetail(id, 2);
            console.log(results);
            this.setState({ results });
        } catch (e) {
            console.log(e);
            this.setState({ error: true });
        }
        console.log('end of page');
    };

    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const {
            match: {
                params: { id }
            }
        } = this.props;
        try {
            const {
                data: { results }
            } = await serverApi.girlDetail(id);
            console.log(results);
            this.setState({ id, results, loading: false });
        } catch (e) {
            console.log(e);
            this.setState({ error: true });
        }
    }

    render() {
        const { id, results, loading, error } = this.state;
        return (
            <GirlPresenter
                id={id}
                results={results}
                loading={loading}
                error={error}
            />
        );
    }
}
