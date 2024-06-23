import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Modal from "./Modal"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import { setAttempts, setCounter, setWin } from "../redux/services/dataReducer"

function StatisticComponent() {
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setWin(false))
    dispatch(setAttempts(0))
    dispatch(setCounter(2))
  }
  const attempts = useSelector((state) => state.data.attempts)
  const win = useSelector((state) => state.data.win)
  return (
    <div className="w-full flex justify-center items-center">
      <div>{`Attempts: ${attempts}`}</div>
      {win && (
        <>
          <Modal show={win} onClose={closeModal}></Modal>
          <div class="pyro">
            <div class="before"></div>
            <div class="after"></div>
          </div>
        </>
      )}
    </div>
  )
}

export default StatisticComponent
