import React, {useEffect} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

export const PushState = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams] = useSearchParams();
    const sort = searchParams.get('sort');

    // Enforce a default `sort` using deep linking
    useEffect(() => {
        if (sort === null) {
            navigate({
                pathname: location.pathname,
                search: '?sort=date',
                hash: "#head",
            }, { replace: true, state: "defaultSort" });
        }
    }, [sort]);

	return <div>
        Sort : {sort} <br/>
        State : {JSON.stringify(location.state)}
	</div>
}
