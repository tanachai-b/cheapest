import cx from "classnames";
import { ReactNode, useRef, useState } from "react";
import { Icon } from "src/common-components";
import { useDivSize, useWindowSize } from "src/common-hooks";
import { NumberField } from "./NumberField";
import { NumberText } from "./NumberText";

export function Entry({
  isEditing,
  isSelected,
  isVisible,
  isCheapest,
  onSelect,
  onChangeItemPrice,
}: {
  isEditing: boolean;
  isSelected: boolean;
  isVisible: boolean;
  isCheapest: boolean;
  onSelect: (isSelected: boolean) => void;
  onChangeItemPrice: (itemPrice: number) => void;
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);

  const onChangeTotalPrice = (totalPrice: number) => {
    const itemPrice = totalPrice / itemCount;

    setTotalPrice(totalPrice);
    setItemPrice(itemPrice);
    onChangeItemPrice(itemPrice);
  };

  const onChangeItemCount = (itemCount: number) => {
    const itemPrice = totalPrice / itemCount;

    setItemCount(itemCount);
    setItemPrice(itemPrice);
    onChangeItemPrice(itemPrice);
  };

  const { width } = useWindowSize();

  return (
    <Container isVisible={isVisible}>
      <Checkbox isEditing={isEditing} isSelected={isSelected} onSelect={onSelect} />

      <Content isVertical={width < 600} isEditing={isEditing}>
        <Row className={cx("basis-[67%]")}>
          <NumberField
            label="Total Price"
            unit="THB"
            decimalDigits={2}
            defaultValue={0}
            initialValue={totalPrice}
            onChange={onChangeTotalPrice}
          />

          <PlainText>÷</PlainText>

          <NumberField
            label="Item Count"
            unit="item/s"
            decimalDigits={0}
            defaultValue={1}
            initialValue={itemCount}
            onChange={onChangeItemCount}
          />
        </Row>

        <Row className={cx("basis-[calc(33%_+_50px)]")}>
          <PlainText>=</PlainText>

          <NumberText
            label="Price per Item"
            unit="THB"
            decimalDigits={2}
            defaultValue={0}
            value={itemPrice}
          />

          <CheckIcon isCheapest={isCheapest} />
        </Row>
      </Content>
    </Container>
  );
}

function Container({ isVisible, children }: { isVisible: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { height } = useDivSize(ref);

  return (
    <div
      className={cx(
        "grid",
        "items-start",
        "justify-items-center",

        isVisible ? "visible" : "invisible",

        "transition-all",
        "overflow-clip",
      )}
      style={{ height: `${isVisible ? height : 0}px` }}
    >
      <div
        ref={ref}
        className={cx(
          "w-full",
          "max-w-[1000px]",

          "flex",
          "flex-row",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Checkbox({
  isEditing,
  isSelected,
  onSelect,
}: {
  isEditing: boolean;
  isSelected: boolean;
  onSelect: (isSelected: boolean) => void;
}) {
  return (
    <div
      className={cx(
        "flex-none",
        isEditing ? "w-[50px]" : "w-0",

        "grid",
        "place-items-center",

        "overflow-clip",

        "transition-all",
      )}
    >
      <button
        className={cx(
          "grid",
          "place-items-center",

          "rounded-full",

          "bg-[#ffffff00]",
          "transition-all",
          "duration-[500ms]",

          "p-[10px]",

          "text-[30px]",
          isSelected ? "text-[#ffffff]" : "text-[#ffffff80]",

          "active:bg-[#ffffff40]",
          "active:duration-0",
        )}
        disabled={!isEditing}
        onClick={() => onSelect(!isSelected)}
      >
        {isSelected && <Icon icon="check_circle" />}

        {!isSelected && <Icon icon="circle" fill={false} />}
      </button>
    </div>
  );
}

function Content({
  isVertical,
  isEditing,
  children,
}: {
  isVertical: boolean;
  isEditing: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex-auto",

        "flex",
        isVertical ? ["flex-col"] : ["flex-row", "justify-center"],

        "p-[20px]",
        "gap-[10px]",

        isEditing && ["opacity-[30%]", "pointer-events-none"],
        "transition-all",
      )}
    >
      {children}
    </div>
  );
}

function Row({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex-auto",

        "flex",
        "flex-row",
        "items-center",

        "gap-[10px]",

        className,
      )}
    >
      {children}
    </div>
  );
}

function PlainText({ children }: { children: ReactNode }) {
  return <div className={cx("flex-none", "text-[20px]", "text-[#ffffff80]")}>{children}</div>;
}

function CheckIcon({ isCheapest }: { isCheapest: boolean }) {
  return (
    <div
      className={cx(
        "flex-none",

        "grid",
        "text-[25px]",

        isCheapest ? "text-[#ffffff]" : "text-[#ffffff20]",
      )}
    >
      <Icon icon="check_circle" />
    </div>
  );
}
