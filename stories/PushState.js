import React, {useEffect} from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';

export const PushState = () => {

    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get('sort');

    // Enforce a default `sort` using deep linking
    useEffect(() => {
        if (sort === null) {
            console.log("enforcing default `sort`");
            const defaultSearchParams = new URLSearchParams({ sort: "date" });
            setSearchParams(defaultSearchParams, { state: "defaultSort" });
        }
    }, [sort]);

	return <div>
        Sort : {sort} <br/>
        State : {JSON.stringify(location.state)}
	</div>
}
