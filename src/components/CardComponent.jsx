import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setAttempts,
  setCounter,
  setLastSelectedCards,
  setLoading,
  setWin,
} from "../redux/services/dataReducer"

function CardComponent({ card, cols, numOfCards }) {
  const dispatch = useDispatch()
  const [clickable, setClickable] = React.useState(true)
  const lastSelectedCards = useSelector((state) => state.data.lastSelectedCards)
  const loading = useSelector((state) => state.data.loading)
  const counter = useSelector((state) => state.data.counter)
  const win = useSelector((state) => state.data.win)
  const attempts = useSelector((state) => state.data.attempts)
  const { icon, comparator, id, isFlipped } = card
  const [flipped, setFlipped] = React.useState(isFlipped)
  const flipCard = async (e) => {
    dispatch(setLoading(true))
    e.target.closest(".flip-card-inner").classList.toggle("flipped")
    setFlipped(!flipped)
    setClickable(false)
    console.log(lastSelectedCards)
    if (
      lastSelectedCards.length === 1 &&
      lastSelectedCards[0].comparator !== comparator
    ) {
      let lastSelectedCard = { ...lastSelectedCards[0] }
      dispatch(setLastSelectedCards([]))
      setTimeout(() => {
        lastSelectedCard.target.classList.toggle("flipped")
        e.target.closest(".flip-card-inner").classList.toggle("flipped")
        lastSelectedCard.setClickable(true)
        setClickable(true)
        dispatch(setAttempts(attempts + 1))
      }, 1000)
      setTimeout(() => {
        setFlipped(false)
        lastSelectedCard.setPreviousFlippedState(false)
      }, 1500)
    } else {
      dispatch(
        setLastSelectedCards([
          {
            comparator: comparator,
            target: e.target.closest(".flip-card-inner"),
            setPreviousFlippedState: setFlipped,
            setClickable: setClickable,
          },
        ])
      )
    }
    if (
      lastSelectedCards.length === 1 &&
      lastSelectedCards[0].comparator === comparator
    ) {
      dispatch(setLastSelectedCards([]))
      dispatch(setCounter(counter + 2))
      dispatch(setAttempts(attempts + 1))
      console.log(counter)
      if (counter === numOfCards) {
        dispatch(setWin(true))
      }
    }
  }

  return (
    <div
      className={`flex-grow-0 flex-shrink-1 flex justify-center items-center`}
      style={{
        width: `${Number.parseInt(document.body.clientWidth / (cols + 1))}px`,
      }}
    >
      <div className="w-20 h-20 flex justify-center items-center card cursor-pointer">
        <div
          className="flip-card-inner"
          onClick={async (e) => {
            if (clickable && !loading) {
              await flipCard(e)
              dispatch(setLoading(false))
            }
          }}
        >
          <div className="flip-card-front">
            <h1 className="text-[60px]">?</h1>
          </div>
          <div className="flip-card-back">
            <div className="text-[60px]">{flipped ? icon : ""}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent
