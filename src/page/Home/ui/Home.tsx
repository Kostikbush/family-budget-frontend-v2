import { CardGrid, Group } from "@vkontakte/vkui";

import { FinanceItem } from "entities/FinanceItem";

import { useHome } from "../hooks/useHome";

import style from "./home.module.scss";

const arr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];

export const Home = () => {
	const {} = useHome();

	return (
		<section className={style.home}>
			<Group mode='card'>
				<CardGrid size='l'>
					<div className={style.financeWrapper}>
						{arr.map(number => (
							<FinanceItem type='connection' delay={number} key={number} canSpend={40} spend={40} />
						))}
					</div>
				</CardGrid>
			</Group>
		</section>
	);
};
