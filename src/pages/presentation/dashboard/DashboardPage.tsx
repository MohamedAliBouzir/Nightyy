import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft, SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../components/Avatar';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import PaginationButtons, {
	PER_COUNT,
} from '../../../components/PaginationButtons';
import WaveHistory from '../../_common/WaveHistory';


const DashboardPage = () => {
	const [jsonData, setJsonData] = useState<any[]>([]);
	const [date, setDate] = useState<Date>(new Date());

	const [filterMenu, setFilterMenu] = useState<boolean>(false);
	

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	const navigate = useNavigate();
	return (
		<PageWrapper title={"History"}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<WaveHistory />
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
