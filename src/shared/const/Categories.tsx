import { AiFillCar, AiOutlineAim } from "react-icons/ai"
import { BiSolidGame, BiSolidMobileVibration } from "react-icons/bi"
import { FaBus, FaComputer } from "react-icons/fa6"
import {
	GiClothes,
	GiHealthCapsule,
	GiMirrorMirror,
	GiReceiveMoney,
	GiTakeMyMoney,
	GiVacuumCleaner,
} from "react-icons/gi"
import { HiMiniPlayPause } from "react-icons/hi2"
import { IoIosCafe, IoMdOutlet } from "react-icons/io"
import { IoAirplaneOutline, IoGiftSharp } from "react-icons/io5"
import {
	MdBedroomParent,
	MdFamilyRestroom,
	MdOutlineCreditScore,
	MdScubaDiving,
	MdSignalWifiStatusbarConnectedNoInternet2,
	MdSportsHandball,
} from "react-icons/md"
import { PiBabyBold } from "react-icons/pi"
import { SiHomeassistant } from "react-icons/si"
import { SlBasket } from "react-icons/sl"

export type Expense = keyof typeof ExpenseTypes
export type Income = keyof typeof IncomesTypes

export type TypeOfFinance =
	| keyof typeof ExpenseTypes
	| keyof typeof IncomesTypes

export const ExpenseTypes = {
	family: {
		text: "семья",
		img: <MdFamilyRestroom />,
		type: "family",
		color: "#813999",
	},
	kids: {
		text: "дети",
		img: <PiBabyBold />,
		type: "kids",
		color: "#6f3340",
	},
	food: {
		text: "еда",
		img: <SlBasket />,
		type: "food",
		color: "#885342",
	},
	cafe: {
		text: "кафе",
		img: <IoIosCafe />,
		type: "cafe",
		color: "#47577e",
	},
	fun: {
		text: "развлечения",
		img: <BiSolidGame />,
		type: "fun",
		color: "#843037",
	},
	housingCommunalServices: {
		text: "ЖКХ",
		img: <SiHomeassistant />,
		type: "housingCommunalServices",
		color: "#68717c",
	},
	credits: {
		text: "кредиты",
		img: <MdOutlineCreditScore />,
		type: "credits",
		color: "#405f69",
	},
	web: {
		text: "интернет",
		img: <MdSignalWifiStatusbarConnectedNoInternet2 />,
		type: "web",
		color: "#575f71",
	},
	connection: {
		text: "связь",
		img: <BiSolidMobileVibration />,
		type: "connection",
		color: "#639483",
	},
	health: {
		text: "здоровье",
		img: <GiHealthCapsule />,
		type: "health",
		color: "#794f83",
	},
	rest: {
		text: "отдых",
		img: <MdScubaDiving />,
		type: "rest",
		color: "#7c806c",
	},
	clothes: {
		text: "одежда",
		img: <GiClothes />,
		type: "clothes",
		color: "#6865a6",
	},
	car: {
		text: "автомобиль",
		img: <AiFillCar />,
		type: "car",
		color: "#44607b",
	},
	beauty: {
		text: "красота",
		img: <GiMirrorMirror />,
		type: "beauty",
		color: "#7c603a",
	},
	transport: {
		text: "транспорт",
		img: <FaBus />,
		type: "transport",
		color: "#889460",
	},
	aim: {
		text: "цели",
		img: <AiOutlineAim />,
		type: "aim",
		color: "#3b258a",
	},
	sport: {
		text: "спорт",
		img: <MdSportsHandball />,
		type: "sport",
		color: "#8b4e55",
	},
	household: {
		text: "бытовые",
		img: <GiVacuumCleaner />,
		type: "household",
		color: "#4478a2",
	},
	technic: {
		text: "техника",
		img: <FaComputer />,
		type: "technic",
		color: "#4d1c4a",
	},
	gifts: {
		text: "подарки",
		img: <IoGiftSharp />,
		type: "gifts",
		color: "#936781",
	},
	vacation: {
		text: "отпуск",
		img: <IoAirplaneOutline />,
		type: "vacation",
		color: "#274777",
	},
	unforeseen: {
		text: "непредвиденный",
		img: <IoMdOutlet />,
		type: "unforeseen",
		color: "#9b4342",
	},
	rent: {
		text: "аренда",
		img: <MdBedroomParent />,
		type: "rent",
		color: "#1e455e",
	},
	subscriptions: {
		text: "подписки",
		img: <HiMiniPlayPause />,
		type: "subscriptions",
		color: "#8d5c3f",
	},
}

export const IncomesTypes = {
	salary: {
		text: "зарплата",
		img: <GiTakeMyMoney />,
		type: "salary",
		color: "#1f9573",
	},
	unforeseen: {
		text: "непредвиденный",
		img: <GiReceiveMoney />,
		type: "unforeseen",
		color: "#27624a",
	},
}
