import React, { useEffect, useState } from "react"
import {
  FcCommandLine,
  FcElectronics,
  FcGlobe,
  FcAndroidOs,
  FcCellPhone,
  FcClock,
  FcCurrencyExchange,
  FcDepartment,
  FcDvdLogo,
  FcFilmReel,
  FcGraduationCap,
  FcWiFiLogo,
} from "react-icons/fc"
import CardComponent from "./CardComponent"
import { v4 as uuidv4 } from "uuid"
import { useDispatch, useSelector } from "react-redux"
import StatisticComponent from "./StatisticComponent"
import { setAttempts, setCounter } from "../redux/services/dataReducer"

function TableComponent() {
  const [predefinedCards, setPredefinedCards] = useState([
    <FcAndroidOs />,
    <FcCellPhone />,
    <FcClock />,
    <FcCurrencyExchange />,
    <FcDepartment />,
    <FcDvdLogo />,
    <FcFilmReel />,
    <FcGraduationCap />,
    <FcWiFiLogo />,
    <FcGlobe />,
    <FcElectronics />,
    <FcCommandLine />,
  ])
  const [cards, setCards] = useState([])
  const [numOfCards, setNumOfCards] = useState(16)
  const dispatch = useDispatch()

  const generateCards = () => {
    const randomCards = getRandomUniqueElements(
      predefinedCards,
      Number(numOfCards) / 4
    )
    const generatedCards = []
    let cardId = 0
    randomCards.forEach((card, idx) => {
      for (let i = 0; i < 4; i++) {
        generatedCards.push({
          id: cardId,
          icon: card,
          comparator: idx,
          isFlipped: false,
        })
        cardId++
      }
    })
    setCards(shuffleCards(generatedCards))
  }

  const getRandomUniqueElements = (array, numElements) => {
    const result = []
    const usedIndices = new Set()

    while (result.length < numElements) {
      const randomIndex = Math.floor(Math.random() * array.length)
      if (!usedIndices.has(randomIndex)) {
        result.push(array[randomIndex])
        usedIndices.add(randomIndex)
      }
    }

    return result
  }

  const shuffleCards = (array) => {
    const newArray = [...array]

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }

    return newArray
  }

  return (
    <div className="w-full h-screen flex flex-wrap items-start">
      <div className="w-full h-fit mt-5 flex justify-center items-center gap-10">
        <select
          className="block mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          name="numOfCards"
          id="numOfCards"
          onChange={(e) => {
            setNumOfCards(Number(e.target.value))
            setCards([])
          }}
        >
          <option value="16">16</option>
          <option value="24">24</option>
          <option value="32">32</option>
          <option value="40">40</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          id="play"
          onClick={() => {
            generateCards()
            dispatch(setAttempts(0))
            dispatch(setCounter(2))
          }}
        >
          Play
        </button>
      </div>
      <div className="">
        <div className={`flex justify-evenly items-center flex-wrap gap-5`}>
          {cards.map((card) => {
            return (
              <CardComponent
                key={uuidv4()}
                card={card}
                cols={cards.length / 4}
                numOfCards={numOfCards}
              />
            )
          })}
        </div>
      </div>
      <StatisticComponent />
    </div>
  )
}

export default TableComponent
