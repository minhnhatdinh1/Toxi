package com.example.demo.controllers;

import com.example.demo.services.VnpayService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(VNPayController.class)
public class VNPayControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VnpayService vnpayService;

    @Test
    void createPayment_shouldReturnPaymentUrl() throws Exception {
        when(vnpayService.createPaymentUrl(anyString(), anyLong(), anyString(), any()))
                .thenReturn("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?mock=true");

        mockMvc.perform(post("/api/payment/vnpay/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "orderCode": "TOXI_TEST_001",
                                  "amount": 150000,
                                  "orderInfo": "Thanh toan don hang TOXI_TEST_001"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.paymentUrl").exists());
    }

    @Test
    void paymentReturn_shouldReturnSuccessWhenChecksumValidAndResponseCode00() throws Exception {
        when(vnpayService.verifyCallback(any(Map.class), anyString())).thenReturn(true);

        mockMvc.perform(get("/api/payment/vnpay/return")
                        .param("vnp_SecureHash", "mock_hash")
                        .param("vnp_ResponseCode", "00")
                        .param("vnp_TxnRef", "TOXI_TEST_001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.validSignature").value(true));
    }

    @Test
    void paymentIpn_shouldReturnInvalidChecksumWhenSignatureFails() throws Exception {
        when(vnpayService.verifyCallback(any(Map.class), anyString())).thenReturn(false);

        mockMvc.perform(get("/api/payment/vnpay/ipn")
                        .param("vnp_SecureHash", "bad_hash")
                        .param("vnp_ResponseCode", "00")
                        .param("vnp_TxnRef", "TOXI_TEST_001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.RspCode").value("97"))
                .andExpect(jsonPath("$.Message").value("Invalid Checksum"));
    }
}
